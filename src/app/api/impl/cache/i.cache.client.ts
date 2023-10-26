export interface ICacheClient<T> {
    get(key: string): Promise<T | null>
    set(key: string, data: T, ttlInSeconds?: number): Promise<any>
    evict(key: string): Promise<boolean>
}