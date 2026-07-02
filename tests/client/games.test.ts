import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import { CoreApiStatus, CoreStatus } from '../../src/types/index.js';
import type { Game, GameVersionsByType, GameVersionsByType2, GameVersionType } from '../../src/types/index.js';

const MOCK_GAME: Game = {
  id: 432,
  name: 'Minecraft',
  slug: 'minecraft',
  dateModified: '2019-08-24T14:15:22Z',
  assets: { iconUrl: '', tileUrl: '', coverUrl: '' },
  status: CoreStatus.Live,
  apiStatus: CoreApiStatus.Public,
  supportedFeatures: { supportModSubscriptions: false },
};

describe('GamesApi', () => {
  it('lists games with pagination', async () => {
    const pagination = { index: 0, pageSize: 50, resultCount: 1, totalCount: 1 };
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_GAME], pagination })]);
    const result = await client.games.list({ index: 0, pageSize: 50 });
    expect(result).toEqual({ data: [MOCK_GAME], pagination });
    expect(mockFetch.lastCall()?.url).toContain('/v1/games?index=0&pageSize=50');
  });

  it('gets a single game and unwraps the data envelope', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_GAME })]);
    const game = await client.games.get(432);
    expect(game).toEqual(MOCK_GAME);
    expect(mockFetch.lastCall()?.url).toContain('/v1/games/432');
  });

  it('gets v1 versions grouped by type', async () => {
    const versions: GameVersionsByType[] = [{ type: 1, versions: ['1.20.1', '1.20.2'] }];
    const { client, mockFetch } = createTestClient([jsonResponse({ data: versions })]);
    const result = await client.games.getVersions(432);
    expect(result).toEqual(versions);
    expect(mockFetch.lastCall()?.url).toContain('/v1/games/432/versions');
  });

  it('gets version types', async () => {
    const types: GameVersionType[] = [
      { id: 1, gameId: 432, name: 'Minecraft', slug: 'minecraft', isSyncable: true, status: 1 },
    ];
    const { client, mockFetch } = createTestClient([jsonResponse({ data: types })]);
    const result = await client.games.getVersionTypes(432);
    expect(result).toEqual(types);
    expect(mockFetch.lastCall()?.url).toContain('/v1/games/432/version-types');
  });

  it('gets v2 versions grouped by type', async () => {
    const versions: GameVersionsByType2[] = [{ type: 1, versions: [{ id: 1, slug: '1-20-1', name: '1.20.1' }] }];
    const { client, mockFetch } = createTestClient([jsonResponse({ data: versions })]);
    const result = await client.games.getVersionsV2(432);
    expect(result).toEqual(versions);
    expect(mockFetch.lastCall()?.url).toContain('/v2/games/432/versions');
  });
});
