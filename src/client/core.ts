import { CurseForgeError } from '../errors.js';
import { buildApiUrl, withJsonBody, parseErrorBody, extractErrorMessage } from '../utils/request.js';
import type { CurseForgeClientOptions } from '../types/base.js';

const DEFAULT_BASE_URL = 'https://api.curseforge.com';
const DEFAULT_TIMEOUT_MS = 10_000;

/** Options passed to individual request methods. */
export interface RequestOptions {
  query?: object;
  body?: BodyInit | object | object[] | null;
  method?: string;
  headers?: HeadersInit;
}

/** Low-level HTTP client used internally by all API namespace classes. */
export class CurseForgeClientCore {
  readonly #baseUrl: string;
  readonly #apiKey: string | undefined;
  readonly #timeoutMs: number;
  readonly #userAgent: string | undefined;
  readonly #fetch: typeof globalThis.fetch;

  constructor(options: CurseForgeClientOptions = {}) {
    this.#baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.#apiKey = options.apiKey;
    this.#timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.#userAgent = options.userAgent;
    this.#fetch = options.fetch ?? globalThis.fetch;
  }

  /** Sends a request and parses the response body as JSON. */
  async requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.#send(path, options);
    return response.json() as Promise<T>;
  }

  async #send(path: string, options: RequestOptions): Promise<Response> {
    const { query, body, method = body != null ? 'POST' : 'GET', headers: extraHeaders } = options;

    const url = buildApiUrl(this.#baseUrl, path, query);
    const init = withJsonBody({ method, body, headers: new Headers(extraHeaders) });
    const headers = init.headers as Headers;

    headers.set('Accept', 'application/json');

    if (this.#userAgent) {
      headers.set('User-Agent', this.#userAgent);
    }

    if (this.#apiKey) {
      headers.set('x-api-key', this.#apiKey);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeoutMs);

    let response: Response;
    try {
      response = await this.#fetch(url, { ...init, signal: controller.signal });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw new CurseForgeError(`Request timed out after ${this.#timeoutMs}ms`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      const responseBody = await parseErrorBody(response);
      throw new CurseForgeError(extractErrorMessage(responseBody, response.status), {
        status: response.status,
        response,
        body: responseBody,
      });
    }

    return response;
  }
}
