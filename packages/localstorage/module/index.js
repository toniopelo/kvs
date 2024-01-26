import { kvsStorage } from "@kvs/storage";
export const kvsLocalStorage = async (options) => {
    return kvsStorage({
        ...options,
        storage: window.localStorage
    });
};
//# sourceMappingURL=index.js.map
