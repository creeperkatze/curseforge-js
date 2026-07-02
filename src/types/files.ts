import type { PaginationOptions } from './base.js';
import type { ModLoaderType } from './minecraft.js';

/** The release type of a mod file. */
export enum FileReleaseType {
  Release = 1,
  Beta = 2,
  Alpha = 3,
}

/** The processing/publishing status of a mod file. */
export enum FileStatus {
  Processing = 1,
  ChangesRequired = 2,
  UnderReview = 3,
  Approved = 4,
  Rejected = 5,
  MalwareDetected = 6,
  Deleted = 7,
  Archived = 8,
  Testing = 9,
  Released = 10,
  ReadyForReview = 11,
  Deprecated = 12,
  Baking = 13,
  AwaitingPublishing = 14,
  FailedPublishing = 15,
  Cooking = 16,
  Cooked = 17,
  UnderManualReview = 18,
  ScanningForMalware = 19,
  ProcessingFile = 20,
  PendingRelease = 21,
  ReadyForCooking = 22,
  PostProcessing = 23,
}

/** How a file relates to another file it depends on. */
export enum FileRelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

/** Hashing algorithm used for a {@link FileHash}. */
export enum HashAlgo {
  Sha1 = 1,
  Md5 = 2,
}

/** A hash of a mod file. */
export interface FileHash {
  value: string;
  algo: HashAlgo;
}

/** A dependency of a mod file on another mod. */
export interface FileDependency {
  modId: number;
  relationType: FileRelationType;
}

/** A submodule of a mod file, identified by its own fingerprint. */
export interface FileModule {
  name: string;
  fingerprint: number;
}

/** Metadata used for sorting files by game version. */
export interface SortableGameVersion {
  /** Original version name (e.g. `1.5b`). */
  gameVersionName: string;
  /** Used for sorting, ordinarily padded with zeroes (e.g. `0000000001.0000000005`). */
  gameVersionPadded: string;
  /** Game version clean name (e.g. `1.5`). */
  gameVersion: string;
  /** Game version release date. */
  gameVersionReleaseDate: string;
  /** Game version type id. */
  gameVersionTypeId: number | null;
}

/** Condensed index entry describing one of a mod's latest files. */
export interface FileIndex {
  gameVersion: string;
  fileId: number;
  filename: string;
  releaseType: FileReleaseType;
  gameVersionTypeId: number | null;
  modLoader: ModLoaderType;
}

/** A file (version) of a mod. */
export interface File {
  /** The file id. */
  id: number;
  /** The game id related to the mod that this file belongs to. */
  gameId: number;
  /** The mod id. */
  modId: number;
  /** Whether the file is available to download. */
  isAvailable: boolean;
  /** Display name of the file. */
  displayName: string;
  /** Exact file name. */
  fileName: string;
  /** The file release type. */
  releaseType: FileReleaseType;
  /** Status of the file. */
  fileStatus: FileStatus;
  /** The file hash(es) (e.g. md5 or sha1). */
  hashes: FileHash[];
  /** The file timestamp. */
  fileDate: string;
  /** The file length in bytes. */
  fileLength: number;
  /** The number of downloads for the file. */
  downloadCount: number;
  /** The file's size on disk. */
  fileSizeOnDisk: number | null;
  /** The file download URL. */
  downloadUrl: string;
  /** List of game versions this file is relevant for. */
  gameVersions: string[];
  /** Metadata used for sorting by game versions. */
  sortableGameVersions: SortableGameVersion[];
  /** List of dependency files. */
  dependencies: FileDependency[];
  exposeAsAlternative: boolean | null;
  parentProjectFileId: number | null;
  alternateFileId: number | null;
  isServerPack: boolean | null;
  serverPackFileId: number | null;
  isEarlyAccessContent: boolean | null;
  earlyAccessEndDate: string | null;
  fileFingerprint: number;
  modules: FileModule[];
}

/** Request body for {@link FilesApi.getFiles}. */
export interface GetModFilesRequestBody {
  /** List of file ids to fetch. */
  fileIds: number[];
}

/** Query parameters for {@link FilesApi.list}. */
export interface GetModFilesOptions extends PaginationOptions {
  /** Filter by game version string. */
  gameVersion?: string;
  /** Filter files associated with the given mod loader (Forge, Fabric, ...). */
  modLoaderType?: ModLoaderType;
  /** Filter files tagged with versions of the given game version type id. */
  gameVersionTypeId?: number;
}
