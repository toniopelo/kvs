import { KvsLocalStorage, KvsLocalStorageOptions } from "@kvs/node-localstorage";
import { KvsEnvStorageOptions } from "./share";
import { KVSIndexedSchema } from "@kvs/indexeddb/lib";
export declare const kvsEnvStorage: <Schema extends KVSIndexedSchema>(
    options: {
        name: string;
        version: number;
        upgrade?({
            kvs,
            oldVersion,
            newVersion
        }: {
            kvs: import("@kvs/types").KVS<Schema>;
            oldVersion: number;
            newVersion: number;
        }): Promise<any>;
    } & {
        [index: string]: any;
    } & {
        kvsVersionKey?: string | undefined;
        storeFilePath?: string | undefined;
        storeQuota?: number | undefined;
    }
) => Promise<KvsLocalStorage<Schema>>;