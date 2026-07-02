import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse, errorResponse } from '../utils/http.js';
import { CurseForgeError } from '../../src/errors.js';
import { CurseForgeClient } from '../../src/client/curseforge.js';
import { createMockFetch } from '../utils/http.js';

describe('CurseForgeClientCore', () => {
  it('attaches the x-api-key header to every request', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [], pagination: {} })]);
    await client.games.list();
    expect(mockFetch.lastCall()?.headers.get('x-api-key')).toBe('test-api-key');
  });

  it('does not send an x-api-key header when no apiKey is configured', async () => {
    const mockFetch = createMockFetch([jsonResponse({ data: [], pagination: {} })]);
    const client = new CurseForgeClient({
      baseUrl: 'https://api.curseforge.com',
      fetch: mockFetch as unknown as typeof fetch,
    });
    await client.games.list();
    expect(mockFetch.lastCall()?.headers.get('x-api-key')).toBeNull();
  });

  it('sends a custom User-Agent header when configured', async () => {
    const mockFetch = createMockFetch([jsonResponse({ data: [], pagination: {} })]);
    const client = new CurseForgeClient({
      baseUrl: 'https://api.curseforge.com',
      apiKey: 'test-api-key',
      userAgent: 'my-app/1.0',
      fetch: mockFetch as unknown as typeof fetch,
    });
    await client.games.list();
    expect(mockFetch.lastCall()?.headers.get('User-Agent')).toBe('my-app/1.0');
  });

  it('throws CurseForgeError on non-ok response', async () => {
    const { client } = createTestClient([errorResponse(401)]);
    await expect(client.games.list()).rejects.toThrow(CurseForgeError);
  });

  it('throws CurseForgeError with message from response body', async () => {
    const { client } = createTestClient([errorResponse(403, { message: 'Forbidden' })]);
    try {
      await client.games.list();
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(CurseForgeError);
      expect((err as CurseForgeError).message).toBe('Forbidden');
      expect((err as CurseForgeError).status).toBe(403);
    }
  });

  it('throws CurseForgeError with message from a nested error object', async () => {
    const { client } = createTestClient([errorResponse(404, { error: { message: 'Not found' } })]);
    try {
      await client.games.get(1);
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(CurseForgeError);
      expect((err as CurseForgeError).message).toBe('Not found');
      expect((err as CurseForgeError).status).toBe(404);
    }
  });
});
