"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsStorage =
    exports.createIterator =
    exports.deleteItem =
    exports.clearItem =
    exports.setItem =
    exports.hasItem =
    exports.getItem =
        void 0;
function invariant(condition, message) {
    if (condition) {
        return;
    }
    throw new Error(message);
}
const TABLE_KEY_MARKER = ".__.";
const getItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    const item = storage.getItem(storageKey);
    return item !== null ? JSON.parse(item) : undefined;
};
exports.getItem = getItem;
const hasItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    return storage.getItem(storageKey) !== null;
};
exports.hasItem = hasItem;
const setItem = (storage, tableName, key, value) => {
    // It is difference with IndexedDB implementation.
    // This behavior compatible with localStorage.
    if (value === undefined) {
        return (0, exports.deleteItem)(storage, tableName, key);
    }
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    return storage.setItem(storageKey, JSON.stringify(value));
};
exports.setItem = setItem;
const clearItem = (storage, tableName, kvsVersionKey, options) => {
    // TODO: kvsVersionKey is special type
    const currentVersion = (0, exports.getItem)(storage, tableName, kvsVersionKey);
    // clear all
    storage.clear();
    // if option.force is true, does not restore metadata.
    if (options.force) {
        return;
    }
    // set kvs version again
    if (currentVersion !== undefined) {
        (0, exports.setItem)(storage, tableName, kvsVersionKey, currentVersion);
    }
};
exports.clearItem = clearItem;
const deleteItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    try {
        storage.removeItem(storageKey);
        return true;
    } catch (_a) {
        return false;
    }
};
exports.deleteItem = deleteItem;
function* createIterator(storage, tableName, kvsVersionKey) {
    const tableKeyPrefix = `${tableName}${TABLE_KEY_MARKER}`;
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) {
            continue;
        }
        // skip another storage
        if (!key.startsWith(tableKeyPrefix)) {
            continue;
        }
        // skip meta key
        const keyWithoutPrefix = key.replace(tableKeyPrefix, "");
        if (keyWithoutPrefix === kvsVersionKey) {
            continue;
        }
        const value = (0, exports.getItem)(storage, tableName, keyWithoutPrefix);
        yield [keyWithoutPrefix, value];
    }
}
exports.createIterator = createIterator;
const DEFAULT_KVS_VERSION = 1;
const openStorage = async ({ storage, version, tableName, kvsVersionKey, onUpgrade }) => {
    // kvsVersionKey is special type
    // first `oldVersion` is `0`
    let oldVersion = (0, exports.getItem)(storage, tableName, kvsVersionKey);
    if (oldVersion === undefined) {
        (0, exports.setItem)(storage, tableName, kvsVersionKey, DEFAULT_KVS_VERSION);
        // first `oldVersion` is `0`
        // https://github.com/azu/kvs/issues/8
        oldVersion = 0;
    }
    // if user set newVersion, upgrade it
    if (oldVersion !== version) {
        await onUpgrade({
            oldVersion,
            newVersion: version,
            storage
        });
        // save current version if upgrade is success
        (0, exports.setItem)(storage, tableName, kvsVersionKey, version);
        return storage;
    }
    return storage;
};
const createStore = ({ tableName, storage, kvsVersionKey }) => {
    const store = {
        get(key) {
            return Promise.resolve().then(() => {
                return (0, exports.getItem)(storage, tableName, key);
            });
        },
        has(key) {
            return Promise.resolve().then(() => {
                return (0, exports.hasItem)(storage, tableName, key);
            });
        },
        set(key, value) {
            return Promise.resolve()
                .then(() => {
                    return (0, exports.setItem)(storage, tableName, key, value);
                })
                .then(() => {
                    return store;
                });
        },
        clear() {
            return Promise.resolve().then(() => {
                return (0, exports.clearItem)(storage, tableName, kvsVersionKey, { force: false });
            });
        },
        delete(key) {
            return Promise.resolve().then(() => {
                return (0, exports.deleteItem)(storage, tableName, key);
            });
        },
        dropInstance() {
            return Promise.resolve().then(() => {
                return (0, exports.clearItem)(storage, tableName, kvsVersionKey, { force: true });
            });
        },
        close() {
            // Noop function
            return Promise.resolve();
        },
        [Symbol.asyncIterator]() {
            const iterator = createIterator(storage, tableName, kvsVersionKey);
            return {
                next() {
                    return Promise.resolve().then(() => {
                        return iterator.next();
                    });
                }
            };
        }
    };
    return store;
};
const kvsStorage = async (options) => {
    var _a;
    const { name, version, upgrade, ...kvStorageOptions } = options;
    invariant(typeof name === "string", "name should be string");
    invariant(name.length > 0, "name should not be empty");
    invariant(!name.includes(TABLE_KEY_MARKER), `name can not include ${TABLE_KEY_MARKER}. It is reserved in kvs.`);
    invariant(typeof version === "number", `version should be number`);
    const kvsVersionKey = (_a = kvStorageOptions.kvsVersionKey) !== null && _a !== void 0 ? _a : "__kvs_version__";
    const storage = await openStorage({
        storage: options.storage,
        version: options.version,
        tableName: name,
        onUpgrade: ({ oldVersion, newVersion, storage }) => {
            if (!options.upgrade) {
                return;
            }
            return options.upgrade({
                kvs: createStore({ tableName: name, storage, kvsVersionKey }),
                oldVersion,
                newVersion
            });
        },
        kvsVersionKey
    });
    return createStore({ tableName: name, storage, kvsVersionKey });
};
exports.kvsStorage = kvsStorage;
//# sourceMappingURL=storage.js.map