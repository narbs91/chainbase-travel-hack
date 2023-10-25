import fetch from 'node-fetch';
import { HTTPResponseError } from '../exceptions/HTTPResponseError';

export const get = async (url: string): Promise<any> => {
    const resp = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });

    if (resp.ok) {
        return await resp.json();
    }

    throw new HTTPResponseError(resp);
};

export const getWithAuth = async (url: string, authHeaderKey: string, authToken: string): Promise<any> => {
    const resp = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', authHeaderKey: authToken }
    });

    if (resp.ok) {
        return await resp.json();
    }

    throw new HTTPResponseError(resp);

};

export const post = async (url: string, body: Object): Promise<any> => {
    const resp = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

    if (resp.ok) {
        return await resp.json();
    }

    throw new HTTPResponseError(resp);
}

export const postWithAuth = async (url: string, body: Object, authHeaderKey: string, authToken: string): Promise<any> => {
    const resp = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json', authHeaderKey: authToken }
    });

    if (resp.ok) {
        return await resp.json();
    }

    throw new HTTPResponseError(resp);
}