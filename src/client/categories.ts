import type { CurseForgeClientCore } from './core.js';
import type { Category, GetCategoriesOptions } from '../types/index.js';
import type { CurseForgeResponse } from '../types/base.js';

/** API namespace for mod categories. */
export class CategoriesApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /**
   * Returns all available classes and categories of the specified game.
   * Add `classId` to only return categories under that class, or `classesOnly` to only return the game's classes.
   */
  async list(options: GetCategoriesOptions): Promise<Category[]> {
    const response = await this.core.requestJson<CurseForgeResponse<Category[]>>('v1/categories', {
      query: options,
    });
    return response.data;
  }
}
