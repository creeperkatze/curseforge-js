import type { CurseForgeClientCore } from './core.js';
import type { User } from '../types/index.js';
import type { CurseForgeResponse } from '../types/base.js';

/**
 * API namespace for users.
 * @remarks This endpoint is not part of CurseForge's published API reference, see {@link User}.
 */
export class UsersApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns a single user by id. */
  async get(userId: number): Promise<User> {
    const response = await this.core.requestJson<CurseForgeResponse<User>>(`v1/users/${userId}`);
    return response.data;
  }
}
