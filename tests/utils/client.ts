import { CurseForgeClient } from '../../src/client/curseforge.js';
import { createMockFetch } from './http.js';

export function createTestClient(responses: Response[] = []) {
  const mockFetch = createMockFetch(responses);
  const client = new CurseForgeClient({
    baseUrl: 'https://api.curseforge.com',
    apiKey: 'test-api-key',
    fetch: mockFetch as unknown as typeof fetch,
  });
  return { client, mockFetch };
}
