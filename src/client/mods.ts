import type { CurseForgeClientCore } from './core.js';
import type {
  FeaturedModsResponse,
  GetFeaturedModsRequestBody,
  GetModDescriptionOptions,
  GetModsByIdsListRequestBody,
  Mod,
  SearchModsOptions,
} from '../types/index.js';
import type { CurseForgeResponse, CurseForgePaginatedResponse } from '../types/base.js';
import { toArrayParam } from '../utils/request.js';

/** API namespace for mods. */
export class ModsApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns all mods that match the given search criteria. */
  async search(options: SearchModsOptions): Promise<CurseForgePaginatedResponse<Mod>> {
    const { categoryIds, gameVersions, modLoaderTypes, ...rest } = options;

    return this.core.requestJson<CurseForgePaginatedResponse<Mod>>('v1/mods/search', {
      query: {
        ...rest,
        categoryIds: toArrayParam(categoryIds),
        gameVersions: toArrayParam(gameVersions),
        modLoaderTypes: toArrayParam(modLoaderTypes),
      },
    });
  }

  /** Returns a single mod. */
  async get(modId: number): Promise<Mod> {
    const response = await this.core.requestJson<CurseForgeResponse<Mod>>(`v1/mods/${modId}`);
    return response.data;
  }

  /** Returns a list of mods belonging to the same game. */
  async getMods(body: GetModsByIdsListRequestBody): Promise<Mod[]> {
    const response = await this.core.requestJson<CurseForgeResponse<Mod[]>>('v1/mods', { body });
    return response.data;
  }

  /** Returns a list of featured, popular, and recently updated mods. */
  async getFeatured(body: GetFeaturedModsRequestBody): Promise<FeaturedModsResponse> {
    const response = await this.core.requestJson<CurseForgeResponse<FeaturedModsResponse>>('v1/mods/featured', {
      body,
    });
    return response.data;
  }

  /** Returns the full description of a mod in HTML format. */
  async getDescription(modId: number, options?: GetModDescriptionOptions): Promise<string> {
    const response = await this.core.requestJson<CurseForgeResponse<string>>(`v1/mods/${modId}/description`, {
      query: options,
    });
    return response.data;
  }
}
