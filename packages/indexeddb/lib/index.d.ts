import type { KVS, KVSOptions } from "@kvs/types";
import type { JsonValue } from "@kvs/storage";
type IndexedDBOptions = {
    tableName?: string;
};
type IndexedDBResults = {
    dropInstance(): Promise<void>;
    __debug__database__: IDBDatabase;
};
export type KVSIndexedSchema = {
    [index: string]: JsonValue;
};
export type KVSIndexedDB<Schema extends KVSIndexedSchema> = KVS<Schema> & IndexedDBResults;
export type KvsIndexedDBOptions<Schema extends KVSIndexedSchema> = KVSOptions<Schema> & IndexedDBOptions;
export declare const kvsIndexedDB: <Schema extends KVSIndexedSchema>(
    options: KvsIndexedDBOptions<Schema>
) => Promise<KVSIndexedDB<Schema>>;
export {};