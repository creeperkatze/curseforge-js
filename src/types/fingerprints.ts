import type { File } from './files.js';

/** A folder of mod files identified together by their fingerprints, for fuzzy matching. */
export interface FolderFingerprint {
  foldername: string;
  fingerprints: number[];
}

/** An exact fingerprint match for a mod file. */
export interface FingerprintMatch {
  id: number;
  file: File;
  latestFiles: File[];
}

/** A fuzzy fingerprint match for a mod file. */
export interface FingerprintFuzzyMatch {
  id: number;
  file: File;
  latestFiles: File[];
  fingerprints: number[];
}

/** Result of matching a list of fingerprints against CurseForge's file index. */
export interface FingerprintsMatchesResult {
  isCacheBuilt: boolean;
  exactMatches: FingerprintMatch[];
  exactFingerprints: number[];
  partialMatches: FingerprintMatch[];
  /** Partially matched fingerprints, keyed by fingerprint. */
  partialMatchFingerprints: Record<string, number[]>;
  installedFingerprints: number[];
  unmatchedFingerprints: number[];
}

/** Result of fuzzy-matching a list of folder fingerprints against CurseForge's file index. */
export interface FingerprintFuzzyMatchResult {
  fuzzyMatches: FingerprintFuzzyMatch[];
}

/** Request body for {@link FingerprintsApi.getMatches}. */
export interface GetFingerprintMatchesRequestBody {
  fingerprints: number[];
}

/** Request body for {@link FingerprintsApi.getFuzzyMatches}. */
export interface GetFuzzyMatchesRequestBody {
  gameId?: number;
  fingerprints: FolderFingerprint[];
}
