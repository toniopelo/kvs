import { KvsStorage } from "@kvs/storage";
import { KvsIndexedDBOptions } from "@kvs/indexeddb";
import { KvsEnvStorageOptions, KvsEnvStorageSchema } from "./share";
export declare const kvsEnvStorage: <Schema extends KvsEnvStorageSchema>(
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
        tableName?: string | undefined;
    }
) => Promise<KvsStorage<Schema>>;