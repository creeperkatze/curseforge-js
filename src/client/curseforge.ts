import { CurseForgeClientCore } from './core.js';
import { CategoriesApi } from './categories.js';
import { FilesApi } from './files.js';
import { FingerprintsApi } from './fingerprints.js';
import { GamesApi } from './games.js';
import { MinecraftApi } from './minecraft.js';
import { ModsApi } from './mods.js';
import type { CurseForgeClientOptions } from '../types/base.js';

/**
 * Client for the CurseForge API.
 * @example
 * ```ts
 * import CurseForgeClient from 'curseforge-js';
 * const client = new CurseForgeClient({ apiKey: 'your-api-key' });
 * const mod = await client.mods.get(238222);
 * ```
 */
export class CurseForgeClient {
  readonly #core: CurseForgeClientCore;

  readonly categories: CategoriesApi;
  readonly files: FilesApi;
  readonly fingerprints: FingerprintsApi;
  readonly games: GamesApi;
  readonly minecraft: MinecraftApi;
  readonly mods: ModsApi;

  constructor(options: CurseForgeClientOptions = {}) {
    this.#core = new CurseForgeClientCore(options);

    this.categories = new CategoriesApi(this.#core);
    this.files = new FilesApi(this.#core);
    this.fingerprints = new FingerprintsApi(this.#core);
    this.games = new GamesApi(this.#core);
    this.minecraft = new MinecraftApi(this.#core);
    this.mods = new ModsApi(this.#core);
  }
}
