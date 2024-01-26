import { KVS, KVSOptions } from "@kvs/types";
export type KVSTestCaseOptions = {
    setTestDataList: {
        name: string;
        value: any;
        type?: "object";
    }[];
};
export type KVSTestCaseRef = {
    current: KVS<any> | null;
    updateRef(ref: KVS<any>): void;
};
export declare const createKVSTestCase: (
    kvsStorageConstructor: (
        options: Partial<KVSOptions<any>> & {
            version: number;
        }
    ) => Promise<KVS<any>>,
    options: KVSTestCaseOptions
) => {
    ref: KVSTestCaseRef;
    run: () => void;
};
