"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsLocalStorage = void 0;
const path_1 = __importDefault(require("path"));
const storage_1 = require("@kvs/storage");
const promises_1 = __importDefault(require("node:fs/promises"));
// @ts-ignore
const node_localstorage_1 = require("node-localstorage");
// @ts-ignore
const app_root_path_1 = __importDefault(require("app-root-path"));
const kvsLocalStorage = async (options) => {
    const defaultCacheDir = path_1.default.join(app_root_path_1.default.toString(), ".cache");
    if (!options.storeFilePath) {
        await promises_1.default.mkdir(defaultCacheDir, {
            recursive: true
        });
    }
    const saveFilePath = options.storeFilePath
        ? options.storeFilePath
        : path_1.default.join(defaultCacheDir, "kvs-node-localstorage");
    const storeQuota = options.storeQuota ? options.storeQuota : 5 * 1024 * 1024;
    return (0, storage_1.kvsStorage)({
        ...options,
        storage: new node_localstorage_1.LocalStorage(saveFilePath, storeQuota)
    });
};
exports.kvsLocalStorage = kvsLocalStorage;
//# sourceMappingURL=index.js.map