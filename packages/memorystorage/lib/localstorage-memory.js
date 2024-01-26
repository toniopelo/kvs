"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// another implements by https://github.com/gr2m/localstorage-memory/blob/master/lib/localstorage-memory.js
class LocalStorageMemory {
    constructor() {
        this.cache = {};
        this.length = 0;
    }
    getItem(key) {
        if (key in this.cache) {
            return this.cache[key];
        }
        return null;
    }
    setItem(key, value) {
        if (typeof value === "undefined") {
            this.removeItem(key);
        } else {
            if (!this.cache.hasOwnProperty(key)) {
                this.length++;
            }
            this.cache[key] = "" + value;
        }
    }
    removeItem(key) {
        if (this.cache.hasOwnProperty(key)) {
            delete this.cache[key];
            this.length--;
        }
    }
    key(index) {
        return Object.keys(this.cache)[index] || null;
    }
    clear() {
        this.cache = {};
        this.length = 0;
    }
}
exports.default = new LocalStorageMemory();
//# sourceMappingURL=localstorage-memory.js.map
