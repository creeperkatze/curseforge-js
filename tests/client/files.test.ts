import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import { FileReleaseType, FileStatus, HashAlgo } from '../../src/types/index.js';
import type { File } from '../../src/types/index.js';

const MOCK_FILE: File = {
  id: 1,
  gameId: 432,
  modId: 238222,
  isAvailable: true,
  displayName: 'jei-1.20.1.jar',
  fileName: 'jei-1.20.1.jar',
  releaseType: FileReleaseType.Release,
  fileStatus: FileStatus.Approved,
  hashes: [{ value: 'abc123', algo: HashAlgo.Sha1 }],
  fileDate: '2019-08-24T14:15:22Z',
  fileLength: 1024,
  downloadCount: 10,
  fileSizeOnDisk: null,
  downloadUrl: 'https://example.com/jei-1.20.1.jar',
  gameVersions: ['1.20.1'],
  sortableGameVersions: [],
  dependencies: [],
  exposeAsAlternative: null,
  parentProjectFileId: null,
  alternateFileId: null,
  isServerPack: null,
  serverPackFileId: null,
  isEarlyAccessContent: null,
  earlyAccessEndDate: null,
  fileFingerprint: 123456789,
  modules: [],
};

describe('FilesApi', () => {
  it('gets a single file', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_FILE })]);
    const file = await client.files.get(238222, 1);
    expect(file).toEqual(MOCK_FILE);
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222/files/1');
  });

  it('lists files for a mod with pagination', async () => {
    const pagination = { index: 0, pageSize: 50, resultCount: 1, totalCount: 1 };
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_FILE], pagination })]);
    const result = await client.files.list(238222, { gameVersion: '1.20.1' });
    expect(result).toEqual({ data: [MOCK_FILE], pagination });
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222/files');
    expect(mockFetch.lastCall()?.url).toContain('gameVersion=1.20.1');
  });

  it('gets multiple files by id via POST', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_FILE] })]);
    const files = await client.files.getFiles({ fileIds: [1] });
    expect(files).toEqual([MOCK_FILE]);
    const call = mockFetch.lastCall()!;
    expect(call.method).toBe('POST');
    expect(await call.clone().json()).toEqual({ fileIds: [1] });
  });

  it('gets a file changelog', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: '<p>Changelog</p>' })]);
    const changelog = await client.files.getChangelog(238222, 1);
    expect(changelog).toBe('<p>Changelog</p>');
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222/files/1/changelog');
  });

  it('gets a file download URL', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: 'https://example.com/jei.jar' })]);
    const url = await client.files.getDownloadUrl(238222, 1);
    expect(url).toBe('https://example.com/jei.jar');
    expect(mockFetch.lastCall()?.url).toContain('/v1/mods/238222/files/1/download-url');
  });
});
