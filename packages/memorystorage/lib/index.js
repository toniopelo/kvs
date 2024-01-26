"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvsMemoryStorage = void 0;
const storage_1 = require("@kvs/storage");
// @ts-ignore
// import localstorage from "localstorage-memory";
const localstorage_memory_1 = __importDefault(require("./localstorage-memory"));
const kvsMemoryStorage = async (options) => {
    return (0, storage_1.kvsStorage)({
        ...options,
        storage: localstorage_memory_1.default
    });
};
exports.kvsMemoryStorage = kvsMemoryStorage;
//# sourceMappingURL=index.js.map
