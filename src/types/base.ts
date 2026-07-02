/** A value that can be serialized as a URL query parameter. */
export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

/** Pagination metadata included in paginated API responses. */
export interface Pagination {
  /** Zero-based index of the first item included in the response. */
  index: number;
  /** Requested number of items to include in the response. */
  pageSize: number;
  /** Actual number of items included in the response. */
  resultCount: number;
  /** Total number of items available by the request. */
  totalCount: number;
}

/** Envelope returned by non-paginated CurseForge endpoints. */
export interface CurseForgeResponse<T> {
  data: T;
}

/** Envelope returned by paginated CurseForge endpoints. */
export interface CurseForgePaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

/** Common query parameters for paginated endpoints. */
export interface PaginationOptions {
  /** Zero-based index of the first item to include. `index + pageSize` must not exceed 10,000. */
  index?: number;
  /** Number of items to include in the response (maximum and default 50). */
  pageSize?: number;
}

/** Options for creating a {@link CurseForgeClient}. */
export interface CurseForgeClientOptions {
  /**
   * Base URL of the CurseForge API.
   * @defaultValue "https://api.curseforge.com"
   */
  baseUrl?: string;
  /** API key sent as the `x-api-key` header on every request. */
  apiKey?: string;
  /**
   * Request timeout in milliseconds.
   * @defaultValue 10000
   */
  timeoutMs?: number;
  /** Value to send as the `User-Agent` header on every request. */
  userAgent?: string;
  /** Custom fetch implementation. */
  fetch?: typeof globalThis.fetch;
}
