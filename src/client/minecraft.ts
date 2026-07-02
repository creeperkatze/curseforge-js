import type { CurseForgeClientCore } from './core.js';
import type {
  GetMinecraftModLoadersOptions,
  GetMinecraftVersionsOptions,
  MinecraftGameVersion,
  MinecraftModLoaderIndex,
  MinecraftModLoaderVersion,
} from '../types/index.js';
import type { CurseForgeResponse } from '../types/base.js';

/** API namespace for Minecraft-specific game version and mod loader data. */
export class MinecraftApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns all Minecraft game versions. */
  async getVersions(options?: GetMinecraftVersionsOptions): Promise<MinecraftGameVersion[]> {
    const response = await this.core.requestJson<CurseForgeResponse<MinecraftGameVersion[]>>(
      'v1/minecraft/version',
      { query: options },
    );
    return response.data;
  }

  /** Returns a specific Minecraft game version by its version string. */
  async getVersion(gameVersionString: string): Promise<MinecraftGameVersion> {
    const response = await this.core.requestJson<CurseForgeResponse<MinecraftGameVersion>>(
      `v1/minecraft/version/${encodeURIComponent(gameVersionString)}`,
    );
    return response.data;
  }

  /** Returns Minecraft mod loaders, optionally filtered by game version. */
  async getModLoaders(options?: GetMinecraftModLoadersOptions): Promise<MinecraftModLoaderIndex[]> {
    const response = await this.core.requestJson<CurseForgeResponse<MinecraftModLoaderIndex[]>>(
      'v1/minecraft/modloader',
      { query: options },
    );
    return response.data;
  }

  /** Returns a specific Minecraft mod loader by name. */
  async getModLoader(modLoaderName: string): Promise<MinecraftModLoaderVersion> {
    const response = await this.core.requestJson<CurseForgeResponse<MinecraftModLoaderVersion>>(
      `v1/minecraft/modloader/${encodeURIComponent(modLoaderName)}`,
    );
    return response.data;
  }
}
