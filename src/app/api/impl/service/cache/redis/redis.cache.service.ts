import { RedisClient } from "../../../cache/redis/redis.client";
import { ICacheService } from "../i.cache.service";

export class RedisCacheService implements ICacheService<string> {
    private client = new RedisClient();

    get = async (key: string): Promise<string | null> => {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.log(error)
        }

        return null;
    }

    set = async (key: string, data: string, ttlInSeconds?: number): Promise<boolean> => {
        try {
            const setResult = await this.client.set(key, data, ttlInSeconds);

            if (setResult !== null) {
                return true;
            } else {
                console.log(`[Unsuccessful setting cache entry. Set returned null] key=${key}, data=${data}`);
            }
        } catch (error) {
            console.log(error)
        }

        return false;
    }

    evict = async (key: string): Promise<boolean> => {
        try {
            return await this.client.evict(key);
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    appendToSet = async (key: string, data: string): Promise<boolean> => {
        try {
            return await this.client.sadd(key, data);

        } catch (error) {
            console.log(error);
        }

        return false;
    }

    getSet = async (key: string): Promise<string[]> => {

        try {
            return await this.client.smembers(key);
        } catch (error) {
            console.log(error);
        }

        return []
    }

    flushChildElementsForParent = async (parentKey: string) => {
        try {
            const childKeys = await this.client.smembers(parentKey);

            if (childKeys && childKeys.length > 0) {
                for (const key of childKeys) {
                    const childEvictStatus = await this.client.evict(key);

                    if (!childEvictStatus) {
                        console.log(`[Failed to evict child key for parent]`)
                    }
                }

                const parentEvictStatus = await this.client.evict(parentKey);

                if (!parentEvictStatus) {
                    console.log(`[Failed to evict parent key`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}