import type { CurseForgeClientCore } from './core.js';
import type { File, GetModFilesOptions, GetModFilesRequestBody } from '../types/index.js';
import type { CurseForgeResponse, CurseForgePaginatedResponse } from '../types/base.js';

/** API namespace for mod files. */
export class FilesApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns a single file of the specified mod. */
  async get(modId: number, fileId: number): Promise<File> {
    const response = await this.core.requestJson<CurseForgeResponse<File>>(`v1/mods/${modId}/files/${fileId}`);
    return response.data;
  }

  /** Returns all files of the specified mod. */
  async list(modId: number, options?: GetModFilesOptions): Promise<CurseForgePaginatedResponse<File>> {
    return this.core.requestJson<CurseForgePaginatedResponse<File>>(`v1/mods/${modId}/files`, { query: options });
  }

  /** Returns a list of files by id. */
  async getFiles(body: GetModFilesRequestBody): Promise<File[]> {
    const response = await this.core.requestJson<CurseForgeResponse<File[]>>('v1/mods/files', { body });
    return response.data;
  }

  /** Returns the changelog of a file in HTML format. */
  async getChangelog(modId: number, fileId: number): Promise<string> {
    const response = await this.core.requestJson<CurseForgeResponse<string>>(
      `v1/mods/${modId}/files/${fileId}/changelog`,
    );
    return response.data;
  }

  /** Returns a download URL for a specific file. */
  async getDownloadUrl(modId: number, fileId: number): Promise<string> {
    const response = await this.core.requestJson<CurseForgeResponse<string>>(
      `v1/mods/${modId}/files/${fileId}/download-url`,
    );
    return response.data;
  }
}
