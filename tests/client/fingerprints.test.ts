import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { FingerprintsMatchesResult, FingerprintFuzzyMatchResult } from '../../src/types/index.js';

const MOCK_MATCHES: FingerprintsMatchesResult = {
  isCacheBuilt: true,
  exactMatches: [],
  exactFingerprints: [123456789],
  partialMatches: [],
  partialMatchFingerprints: {},
  installedFingerprints: [],
  unmatchedFingerprints: [],
};

const MOCK_FUZZY_MATCHES: FingerprintFuzzyMatchResult = {
  fuzzyMatches: [],
};

describe('FingerprintsApi', () => {
  it('gets fingerprint matches without a game id', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_MATCHES })]);
    const result = await client.fingerprints.getMatches([123456789]);
    expect(result).toEqual(MOCK_MATCHES);
    const call = mockFetch.lastCall()!;
    expect(call.url).toContain('/v1/fingerprints');
    expect(call.url).not.toContain('/v1/fingerprints/');
    expect(await call.clone().json()).toEqual({ fingerprints: [123456789] });
  });

  it('gets fingerprint matches scoped to a game id', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_MATCHES })]);
    await client.fingerprints.getMatches([123456789], 432);
    expect(mockFetch.lastCall()?.url).toContain('/v1/fingerprints/432');
  });

  it('gets fuzzy fingerprint matches without a game id', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_FUZZY_MATCHES })]);
    const result = await client.fingerprints.getFuzzyMatches([{ foldername: 'mods', fingerprints: [1, 2] }]);
    expect(result).toEqual(MOCK_FUZZY_MATCHES);
    expect(mockFetch.lastCall()?.url).toContain('/v1/fingerprints/fuzzy');
  });

  it('gets fuzzy fingerprint matches scoped to a game id', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_FUZZY_MATCHES })]);
    await client.fingerprints.getFuzzyMatches([{ foldername: 'mods', fingerprints: [1, 2] }], 432);
    expect(mockFetch.lastCall()?.url).toContain('/v1/fingerprints/fuzzy/432');
  });
});
