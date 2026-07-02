import { describe, it, expect } from 'vitest';
import { normalizeBaseUrl, appendQuery, buildApiUrl, toArrayParam } from '../../src/utils/request.js';

describe('normalizeBaseUrl', () => {
  it('strips trailing slashes', () => {
    expect(normalizeBaseUrl('https://api.curseforge.com/')).toBe('https://api.curseforge.com');
  });

  it('leaves plain base URL unchanged', () => {
    expect(normalizeBaseUrl('https://api.curseforge.com')).toBe('https://api.curseforge.com');
  });

  it('throws on empty string', () => {
    expect(() => normalizeBaseUrl('')).toThrow(TypeError);
  });
});

describe('buildApiUrl', () => {
  it('constructs a URL for a v1 path', () => {
    const url = buildApiUrl('https://api.curseforge.com', 'v1/games');
    expect(url).toBe('https://api.curseforge.com/v1/games');
  });

  it('constructs a URL for a v2 path', () => {
    const url = buildApiUrl('https://api.curseforge.com', 'v2/games/432/versions');
    expect(url).toBe('https://api.curseforge.com/v2/games/432/versions');
  });

  it('appends query parameters', () => {
    const url = buildApiUrl('https://api.curseforge.com', 'v1/games', { index: 0, pageSize: 10 });
    expect(url).toContain('index=0');
    expect(url).toContain('pageSize=10');
  });

  it('skips null and undefined query values', () => {
    const url = buildApiUrl('https://api.curseforge.com', 'v1/games', { index: null, pageSize: undefined });
    expect(url).not.toContain('index');
    expect(url).not.toContain('pageSize');
  });
});

describe('appendQuery', () => {
  it('handles array values', () => {
    const url = new URL('https://example.com/test');
    appendQuery(url, { tags: ['a', 'b'] });
    expect(url.searchParams.getAll('tags')).toEqual(['a', 'b']);
  });
});

describe('toArrayParam', () => {
  it('returns undefined for undefined input', () => {
    expect(toArrayParam(undefined)).toBeUndefined();
  });

  it('encodes a number array as a bracketed string', () => {
    expect(toArrayParam([1, 2, 3])).toBe('[1,2,3]');
  });

  it('encodes a string array as a bracketed, quoted string', () => {
    expect(toArrayParam(['1.19.1', '1.19.2'])).toBe('["1.19.1","1.19.2"]');
  });

  it('encodes an empty array', () => {
    expect(toArrayParam([])).toBe('[]');
  });
});
