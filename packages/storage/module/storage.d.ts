import type { KVS, KVSOptions, StoreNames, StoreValue } from "@kvs/types";
import { JsonValue } from "./JSONValue";
export type KVSStorageKey = string;
export declare const getItem: <Schema extends StorageSchema>(
    storage: Storage,
    tableName: string,
    key: StoreNames<Schema>
) => any;
export declare const hasItem: <Schema extends StorageSchema>(
    storage: Storage,
    tableName: string,
    key: StoreNames<Schema>
) => boolean;
export declare const setItem: <Schema extends StorageSchema>(
    storage: Storage,
    tableName: string,
    key: StoreNames<Schema>,
    value: StoreValue<Schema, StoreNames<Schema>> | undefined
) => boolean | void;
export declare const clearItem: (
    storage: Storage,
    tableName: string,
    kvsVersionKey: string,
    options: {
        force: boolean;
    }
) => void;
export declare const deleteItem: <Schema extends StorageSchema>(
    storage: Storage,
    tableName: string,
    key: StoreNames<Schema>
) => boolean;
export declare function createIterator<Schema extends StorageSchema>(
    storage: Storage,
    tableName: string,
    kvsVersionKey: string
): Iterator<[StoreNames<Schema>, StoreValue<Schema, StoreNames<Schema>>]>;
export type StorageSchema = {
    [index: string]: JsonValue;
};
export type KvsStorage<Schema extends StorageSchema> = KVS<Schema>;
export type KvsStorageOptions<Schema extends StorageSchema> = KVSOptions<Schema> & {
    kvsVersionKey?: string;
    storage: Storage;
};
export declare const kvsStorage: <Schema extends StorageSchema>(
    options: KvsStorageOptions<Schema>
) => Promise<KvsStorage<Schema>>;