import { kvsStorage } from "@kvs/storage";
// @ts-ignore
// import localstorage from "localstorage-memory";
import localstorage from "./localstorage-memory";
export const kvsMemoryStorage = async (options) => {
    return kvsStorage({
        ...options,
        storage: localstorage
    });
};
//# sourceMappingURL=index.js.map
