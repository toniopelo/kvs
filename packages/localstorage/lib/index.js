"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsLocalStorage = void 0;
const storage_1 = require("@kvs/storage");
const kvsLocalStorage = async (options) => {
    return (0, storage_1.kvsStorage)({
        ...options,
        storage: window.localStorage
    });
};
exports.kvsLocalStorage = kvsLocalStorage;
//# sourceMappingURL=index.js.map
