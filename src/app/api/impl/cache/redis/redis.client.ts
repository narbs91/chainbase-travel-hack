import { Redis } from "@upstash/redis";
import { ICacheClient } from "../i.cache.client";

export class RedisClient implements ICacheClient<string> {
    private redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL as string,
        token: process.env.UPSTASH_REDIS_REST_TOKEN as string
    })

    set = async (key: string, data: string, ttlInSeconds?: number): Promise<string | null> => {
        if (ttlInSeconds) {
            return await this.redis.set(key, data, { ex: ttlInSeconds });
        }

        return await this.redis.set(key, data);
    }

    get = async (key: string): Promise<string | null> => {
        return await this.redis.get(key);
    }

    evict = async (key: string): Promise<boolean> => {
        const evictResult = await this.redis.del(key);

        if (evictResult > 0) {
            return true;
        }

        return false;
    }

    sadd = async (key: string, data: string): Promise<boolean> => {

        const result = await this.redis.sadd(key, data);

        if (result > 0) {
            return true;
        }

        return false;
    }

    smembers = async (key: string): Promise<string[]> => {
        return await this.redis.smembers(key);
    }
}