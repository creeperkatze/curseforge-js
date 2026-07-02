import type { CurseForgeClientCore } from './core.js';
import type {
  Game,
  GameVersionsByType,
  GameVersionsByType2,
  GameVersionType,
  GetGamesOptions,
} from '../types/index.js';
import type { CurseForgeResponse, CurseForgePaginatedResponse } from '../types/base.js';

/** API namespace for games. */
export class GamesApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns all games available to the provided API key. */
  async list(options?: GetGamesOptions): Promise<CurseForgePaginatedResponse<Game>> {
    return this.core.requestJson<CurseForgePaginatedResponse<Game>>('v1/games', { query: options });
  }

  /** Returns a single game. A private game is only accessible by its respective API key. */
  async get(gameId: number): Promise<Game> {
    const response = await this.core.requestJson<CurseForgeResponse<Game>>(`v1/games/${gameId}`);
    return response.data;
  }

  /** Returns all available versions for each known version type of the specified game. */
  async getVersions(gameId: number): Promise<GameVersionsByType[]> {
    const response = await this.core.requestJson<CurseForgeResponse<GameVersionsByType[]>>(
      `v1/games/${gameId}/versions`,
    );
    return response.data;
  }

  /** Returns all available version types of the specified game. */
  async getVersionTypes(gameId: number): Promise<GameVersionType[]> {
    const response = await this.core.requestJson<CurseForgeResponse<GameVersionType[]>>(
      `v1/games/${gameId}/version-types`,
    );
    return response.data;
  }

  /** Returns all available versions for each known version type of the specified game, as full version objects. */
  async getVersionsV2(gameId: number): Promise<GameVersionsByType2[]> {
    const response = await this.core.requestJson<CurseForgeResponse<GameVersionsByType2[]>>(
      `v2/games/${gameId}/versions`,
    );
    return response.data;
  }
}
