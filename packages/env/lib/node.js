"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsEnvStorage = void 0;
const node_localstorage_1 = require("@kvs/node-localstorage");
const kvsEnvStorage = async (options) => {
    return (0, node_localstorage_1.kvsLocalStorage)(options);
};
exports.kvsEnvStorage = kvsEnvStorage;
//# sourceMappingURL=node.js.map