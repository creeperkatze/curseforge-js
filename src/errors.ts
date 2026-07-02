/** Error thrown for request failures, timeouts, and CurseForge API errors. */
export class CurseForgeError extends Error {
  override name = 'CurseForgeError' as const;
  status: number;
  response: Response | undefined;
  body: unknown;

  constructor(message: string, options: {
    status?: number;
    response?: Response;
    body?: unknown;
  } = {}) {
    super(message);
    this.status = options.status ?? 0;
    this.response = options.response;
    this.body = options.body;
  }
}
