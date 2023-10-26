export interface ICacheService<T> {
    get(key: string): Promise<T | null>
    set(key: string, data: T, ttlInSeconds? :number): Promise<boolean>
    evict(key: string): Promise<boolean>
}