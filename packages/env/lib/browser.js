"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsEnvStorage = void 0;
const indexeddb_1 = require("@kvs/indexeddb");
const kvsEnvStorage = async (options) => {
    return (0, indexeddb_1.kvsIndexedDB)(options);
};
exports.kvsEnvStorage = kvsEnvStorage;
//# sourceMappingURL=browser.js.map