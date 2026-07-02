import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import { ModLoaderType, ModStatus, ModsSearchSortField } from '../../src/types/index.js';
import type { Mod } from '../../src/types/index.js';

const MOCK_MOD: Mod = {
  id: 238222,
  gameId: 432,
  name: 'Just Enough Items',
  slug: 'jei',
  links: { websiteUrl: '', wikiUrl: '', issuesUrl: '', sourceUrl: '' },
  summary: 'View Items and Recipes',
  status: ModStatus.Approved,
  downloadCount: 100,
  isFeatured: false,
  primaryCategoryId: 6,
  categories: [],
  classId: 6,
  authors: [{ id: 1, name: 'mezz', url: '' }],
  logo: { id: 1, modId: 238222, title: '', description: '', thumbnailUrl: '', url: '' },
  screenshots: [],
  mainFileId: 1,
  latestFiles: [],
  latestFilesIndexes: [],
  latestEarlyAccessFilesIndexes: [],
  dateCreated: '2019-08-24T14:15:22Z',
  dateModified: '2019-08-24T14:15:22Z',
  dateReleased: '2019-08-24T14:15:22Z',
  allowModDistribution: true,
  gamePopularityRank: 1,
  isAvailable: true,
  thumbsUpCount: 0,
  rating: null,
};

describe('ModsApi', () => {
  it('searches mods with basic filters', async () => {
    const pagination = { index: 0, pageSize: 50, resultCount: 1, totalCount: 1 };
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_MOD], pagination })]);
    const result = await client.mods.search({ gameId: 432, searchFilter: 'jei' });
    expect(result).toEqual({ data: [MOCK_MOD], pagination });
    expect(mockFetch.lastCall()?.url).toContain('gameId=432');
    expect(mockFetch.lastCall()?.url).toContain('searchFilter=jei');
  });

  it('encodes categoryIds, gameVersions, and modLoaderTypes as bracketed arrays', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [], pagination: {} })]);
    await client.mods.search({
      gameId: 432,
      categoryIds: [1, 2, 3],
      gameVersions: ['1.20.1', '1.20.2'],
      modLoaderTypes: [ModLoaderType.Forge, ModLoaderType.Fabric],
      sortField: ModsSearchSortField.Popularity,
      sortOrder: 'desc',
    });
    const url = new URL(mockFetch.lastCall()!.url);
    expect(url.searchParams.get('categoryIds')).toBe('[1,2,3]');
    expect(url.searchParams.get('gameVersions')).toBe('["1.20.1","1.20.2"]');
    expect(url.searchParams.get('modLoaderTypes')).toBe('[1,4]');
    expect(url.searchParams.get('sortField')).toBe('2');
    expect(url.searchParams.get('sortOrder')).toBe('desc');
  });

  it('gets a single mod and unwraps the data envelope', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_MOD })]);
    const mod = await client.mods.get(238222);
    expect(mod).toEqual(MOCK_MOD);
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222');
  });

  it('gets multiple mods by id via POST', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_MOD] })]);
    const mods = await client.mods.getMods({ modIds: [238222] });
    expect(mods).toEqual([MOCK_MOD]);
    const call = mockFetch.lastCall()!;
    expect(call.method).toBe('POST');
    expect(await call.clone().json()).toEqual({ modIds: [238222] });
  });

  it('gets featured mods', async () => {
    const featured = { featured: [MOCK_MOD], popular: [], recentlyUpdated: [] };
    const { client, mockFetch } = createTestClient([jsonResponse({ data: featured })]);
    const result = await client.mods.getFeatured({ gameId: 432 });
    expect(result).toEqual(featured);
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/featured');
  });

  it('gets a mod description', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: '<p>Hello</p>' })]);
    const description = await client.mods.getDescription(238222, { stripped: true });
    expect(description).toBe('<p>Hello</p>');
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222/description');
    expect(mockFetch.lastCall()?.url).toContain('stripped=true');
  });
});
