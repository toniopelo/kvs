declare class LocalStorageMemory {
    cache: {
        [k: string]: string;
    };
    length: number;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(index: any): string | null;
    clear(): void;
}
declare const _default: LocalStorageMemory;
export default _default;
