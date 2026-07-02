import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { Category } from '../../src/types/index.js';

const MOCK_CATEGORIES: Category[] = [
  {
    id: 6,
    gameId: 432,
    name: 'Mods',
    slug: 'mods',
    url: 'https://www.curseforge.com/minecraft/mc-mods',
    iconUrl: '',
    dateModified: '2019-08-24T14:15:22Z',
    isClass: true,
    classId: null,
    parentCategoryId: null,
    displayIndex: 0,
  },
];

describe('CategoriesApi', () => {
  it('lists categories for a game', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_CATEGORIES })]);
    const categories = await client.categories.list({ gameId: 432 });
    expect(categories).toEqual(MOCK_CATEGORIES);
    expect(mockFetch.lastCall()?.url).toContain('/v1/categories?gameId=432');
  });

  it('supports filtering by classId and classesOnly', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_CATEGORIES })]);
    await client.categories.list({ gameId: 432, classId: 6, classesOnly: true });
    const url = mockFetch.lastCall()?.url ?? '';
    expect(url).toContain('gameId=432');
    expect(url).toContain('classId=6');
    expect(url).toContain('classesOnly=true');
  });
});
