function invariant(condition, message) {
    if (condition) {
        return;
    }
    throw new Error(message);
}
const TABLE_KEY_MARKER = ".__.";
export const getItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    const item = storage.getItem(storageKey);
    return item !== null ? JSON.parse(item) : undefined;
};
export const hasItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    return storage.getItem(storageKey) !== null;
};
export const setItem = (storage, tableName, key, value) => {
    // It is difference with IndexedDB implementation.
    // This behavior compatible with localStorage.
    if (value === undefined) {
        return deleteItem(storage, tableName, key);
    }
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    return storage.setItem(storageKey, JSON.stringify(value));
};
export const clearItem = (storage, tableName, kvsVersionKey, options) => {
    // TODO: kvsVersionKey is special type
    const currentVersion = getItem(storage, tableName, kvsVersionKey);
    // clear all
    storage.clear();
    // if option.force is true, does not restore metadata.
    if (options.force) {
        return;
    }
    // set kvs version again
    if (currentVersion !== undefined) {
        setItem(storage, tableName, kvsVersionKey, currentVersion);
    }
};
export const deleteItem = (storage, tableName, key) => {
    const storageKey = `${tableName}${TABLE_KEY_MARKER}${String(key)}`;
    try {
        storage.removeItem(storageKey);
        return true;
    } catch (_a) {
        return false;
    }
};
export function* createIterator(storage, tableName, kvsVersionKey) {
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
        const value = getItem(storage, tableName, keyWithoutPrefix);
        yield [keyWithoutPrefix, value];
    }
}
const DEFAULT_KVS_VERSION = 1;
const openStorage = async ({ storage, version, tableName, kvsVersionKey, onUpgrade }) => {
    // kvsVersionKey is special type
    // first `oldVersion` is `0`
    let oldVersion = getItem(storage, tableName, kvsVersionKey);
    if (oldVersion === undefined) {
        setItem(storage, tableName, kvsVersionKey, DEFAULT_KVS_VERSION);
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
        setItem(storage, tableName, kvsVersionKey, version);
        return storage;
    }
    return storage;
};
const createStore = ({ tableName, storage, kvsVersionKey }) => {
    const store = {
        get(key) {
            return Promise.resolve().then(() => {
                return getItem(storage, tableName, key);
            });
        },
        has(key) {
            return Promise.resolve().then(() => {
                return hasItem(storage, tableName, key);
            });
        },
        set(key, value) {
            return Promise.resolve()
                .then(() => {
                    return setItem(storage, tableName, key, value);
                })
                .then(() => {
                    return store;
                });
        },
        clear() {
            return Promise.resolve().then(() => {
                return clearItem(storage, tableName, kvsVersionKey, { force: false });
            });
        },
        delete(key) {
            return Promise.resolve().then(() => {
                return deleteItem(storage, tableName, key);
            });
        },
        dropInstance() {
            return Promise.resolve().then(() => {
                return clearItem(storage, tableName, kvsVersionKey, { force: true });
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
export const kvsStorage = async (options) => {
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
//# sourceMappingURL=storage.js.map