import type { CurseForgeClientCore } from './core.js';
import type {
  FingerprintFuzzyMatchResult,
  FingerprintsMatchesResult,
  FolderFingerprint,
} from '../types/index.js';
import type { CurseForgeResponse } from '../types/base.js';

/** API namespace for matching mod files by their Murmur2 fingerprints. */
export class FingerprintsApi {
  constructor(private readonly core: CurseForgeClientCore) {}

  /** Returns mod files that match the given list of fingerprints, optionally scoped to a single game. */
  async getMatches(fingerprints: number[], gameId?: number): Promise<FingerprintsMatchesResult> {
    const path = gameId != null ? `v1/fingerprints/${gameId}` : 'v1/fingerprints';
    const response = await this.core.requestJson<CurseForgeResponse<FingerprintsMatchesResult>>(path, {
      body: { fingerprints },
    });
    return response.data;
  }

  /** Returns mod files that fuzzy-match the given list of folder fingerprints, optionally scoped to a single game. */
  async getFuzzyMatches(fingerprints: FolderFingerprint[], gameId?: number): Promise<FingerprintFuzzyMatchResult> {
    const path = gameId != null ? `v1/fingerprints/fuzzy/${gameId}` : 'v1/fingerprints/fuzzy';
    const response = await this.core.requestJson<CurseForgeResponse<FingerprintFuzzyMatchResult>>(path, {
      body: { gameId, fingerprints },
    });
    return response.data;
  }
}
