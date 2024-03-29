import { PuppeteerExtraPlugin } from 'puppeteer-extra-plugin';
import { TypedEmitter } from 'tiny-typed-emitter';
import type { HTTPRequest, HTTPResponse, Page } from 'puppeteer';
export type ExtendedHTTPRequest = HTTPRequest & {
    date: number;
};
export type ExtendedHTTPResponse = HTTPResponse & {
    body: () => Promise<string>;
    date: number;
};
export type ExtendedPageMethods = {
    networkCache: NetworkCache;
};
export interface NetworkCacheEvents {
    'request': (request: ExtendedHTTPRequest) => void;
    'response': (response: ExtendedHTTPResponse) => void;
}
declare module 'puppeteer' {
    interface Page extends ExtendedPageMethods {
    }
}
declare module 'puppeteer-core' {
    interface Page extends ExtendedPageMethods {
    }
}
export declare class NetworkCache {
    /** How many HTTP records should be stored in the cache. */
    cacheLimit: number;
    /** Page HTTPRequest array. */
    requests: ExtendedHTTPRequest[];
    /** Page HTTPResponse array. */
    responses: ExtendedHTTPResponse[];
    /** A function that decides whether to save an HTTP request to the cache or not. Default: save all requests. */
    requestValidatorFn: (request: ExtendedHTTPRequest) => boolean | Promise<boolean>;
    /** A function that decides whether to save an HTTP response to the cache or not. Default: save all responses. */
    responseValidatorFn: (response: ExtendedHTTPResponse) => boolean | Promise<boolean>;
    /** EventEmitter for HTTPRequest / HTTPResponse.
     *
     *  Events:
     *  1) request
     *  2) response
     */
    eventEmitter: TypedEmitter<NetworkCacheEvents>;
    constructor();
    /**
     * Check the existence of a request and return it (if exists), using RegExp for validation.
     * @param {RegExp} urlRegex - RegExp template to search request by URL.
     * @returns {ExtendedHTTPRequest|undefined} Represents an HTTP request sent by a page | undefined (Not found)
     */
    existRequest(urlRegex: RegExp): ExtendedHTTPRequest | undefined;
    /**
     * Check the existence of a response and return it (if exists), using RegExp for validation.
     * @param {RegExp} urlRegex - RegExp template to search response by URL.
     * @returns {ExtendedHTTPResponse|undefined} Represents an HTTP response received by a page | undefined (Not found)
     */
    existResponse(urlRegex: RegExp): ExtendedHTTPResponse | undefined;
    /**
     * Wait for the request to appear, then return it.
     * @param {RegExp} urlRegex - RegExp template to search request by URL.
     * @param {number} [timeout=20000] - Waiting time for a request to be received.
     * @returns {ExtendedHTTPRequest} Represents an HTTP request sent by a page.
     * @throws Will throw an error, if the timeout expires.
     */
    waitRequest(urlRegex: RegExp, timeout?: number): Promise<ExtendedHTTPRequest>;
    /**
     * Wait for the response to appear, then return it.
     * @param {RegExp} urlRegex - RegExp template to search response by URL.
     * @param {Number} [timeout=20000] - Waiting time for a response to be received.
     * @returns {ExtendedHTTPResponse} Represents an HTTP response received by a page.
     * @throws Will throw an error, if the timeout expires.
     */
    waitResponse(urlRegex: RegExp, timeout?: number): Promise<ExtendedHTTPResponse>;
}
/**
 * Saves HTTP requests/responses from browser/pages in cache
 */
export declare class PuppeteerNetworkCache extends PuppeteerExtraPlugin {
    get name(): string;
    onPageCreated(page: Page): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map