import { JsonValue, KvsStorage } from "@kvs/storage";
import { KVS, KVSOptions } from "@kvs/types";
export type KvsMemoryStorageSchema = {
    [index: string]: JsonValue;
};
export type KvsMemoryStorage<Schema extends KvsMemoryStorageSchema> = KVS<Schema>;
export type KvsMemoryStorageOptions<Schema extends KvsMemoryStorageSchema> = KVSOptions<Schema> & {
    kvsVersionKey?: string;
};
export declare const kvsMemoryStorage: <Schema extends KvsMemoryStorageSchema>(
    options: KvsMemoryStorageOptions<Schema>
) => Promise<KvsStorage<Schema>>;
