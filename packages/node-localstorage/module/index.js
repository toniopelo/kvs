import path from "path";
import { kvsStorage } from "@kvs/storage";
import fs from "node:fs/promises";
// @ts-ignore
import { LocalStorage } from "node-localstorage";
// @ts-ignore
import appRoot from "app-root-path";
export const kvsLocalStorage = async (options) => {
    const defaultCacheDir = path.join(appRoot.toString(), ".cache");
    if (!options.storeFilePath) {
        await fs.mkdir(defaultCacheDir, {
            recursive: true
        });
    }
    const saveFilePath = options.storeFilePath
        ? options.storeFilePath
        : path.join(defaultCacheDir, "kvs-node-localstorage");
    const storeQuota = options.storeQuota ? options.storeQuota : 5 * 1024 * 1024;
    return kvsStorage({
        ...options,
        storage: new LocalStorage(saveFilePath, storeQuota)
    });
};
//# sourceMappingURL=index.js.map