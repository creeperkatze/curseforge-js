import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import { GameVersionStatus, GameVersionTypeStatus, ModLoaderType } from '../../src/types/index.js';
import type { MinecraftGameVersion, MinecraftModLoaderIndex, MinecraftModLoaderVersion } from '../../src/types/index.js';

const MOCK_VERSION: MinecraftGameVersion = {
  id: 1,
  gameVersionId: 1,
  versionString: '1.20.1',
  jarDownloadUrl: '',
  jsonDownloadUrl: '',
  approved: true,
  dateModified: '2019-08-24T14:15:22Z',
  gameVersionTypeId: 1,
  gameVersionStatus: GameVersionStatus.Approved,
  gameVersionTypeStatus: GameVersionTypeStatus.Normal,
};

describe('MinecraftApi', () => {
  it('gets all Minecraft versions', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_VERSION] })]);
    const versions = await client.minecraft.getVersions();
    expect(versions).toEqual([MOCK_VERSION]);
    expect(mockFetch.lastCall()?.url).toContain('/v1/minecraft/version');
  });

  it('gets Minecraft versions sorted descending', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: [MOCK_VERSION] })]);
    await client.minecraft.getVersions({ sortDescending: true });
    expect(mockFetch.lastCall()?.url).toContain('sortDescending=true');
  });

  it('gets a specific Minecraft version', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_VERSION })]);
    const version = await client.minecraft.getVersion('1.20.1');
    expect(version).toEqual(MOCK_VERSION);
    expect(mockFetch.lastCall()?.url).toContain('/v1/minecraft/version/1.20.1');
  });

  it('gets mod loaders', async () => {
    const loaders: MinecraftModLoaderIndex[] = [
      { name: 'forge-1.20.1', gameVersion: '1.20.1', latest: true, recommended: true, dateModified: '2019-08-24T14:15:22Z', type: ModLoaderType.Forge },
    ];
    const { client, mockFetch } = createTestClient([jsonResponse({ data: loaders })]);
    const result = await client.minecraft.getModLoaders({ version: '1.20.1' });
    expect(result).toEqual(loaders);
    expect(mockFetch.lastCall()?.url).toContain('version=1.20.1');
  });

  it('gets a specific mod loader', async () => {
    const loader = { name: 'forge-1.20.1' } as MinecraftModLoaderVersion;
    const { client, mockFetch } = createTestClient([jsonResponse({ data: loader })]);
    const result = await client.minecraft.getModLoader('forge-1.20.1');
    expect(result).toEqual(loader);
    expect(mockFetch.lastCall()?.url).toContain('/v1/minecraft/modloader/forge-1.20.1');
  });
});
