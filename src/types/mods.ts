import type { Category } from './categories.js';
import type { File, FileIndex } from './files.js';
import type { ModLoaderType } from './minecraft.js';
import type { PaginationOptions } from './base.js';

/** The approval status of a mod. */
export enum ModStatus {
  New = 1,
  ChangesRequired = 2,
  UnderSoftReview = 3,
  Approved = 4,
  Rejected = 5,
  ChangesMade = 6,
  Inactive = 7,
  Abandoned = 8,
  Deleted = 9,
  UnderReview = 10,
}

/** Field to sort mod search results by. */
export enum ModsSearchSortField {
  Featured = 1,
  Popularity = 2,
  LastUpdated = 3,
  Name = 4,
  Author = 5,
  TotalDownloads = 6,
  Category = 7,
  GameVersion = 8,
  EarlyAccess = 9,
  FeaturedReleased = 10,
  ReleasedDate = 11,
  Rating = 12,
}

/** Sort direction for mod search results. */
export type SortOrder = 'asc' | 'desc';

/** Relevant external links for a mod. */
export interface ModLinks {
  websiteUrl: string;
  wikiUrl: string;
  issuesUrl: string;
  sourceUrl: string;
}

/** An author of a mod. */
export interface ModAuthor {
  id: number;
  name: string;
  url: string;
}

/** An image asset (logo or screenshot) belonging to a mod. */
export interface ModAsset {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

/** A mod (project) on CurseForge. */
export interface Mod {
  /** The mod id. */
  id: number;
  /** The game id this mod is for. */
  gameId: number;
  /** The name of the mod. */
  name: string;
  /** The mod slug that would appear in the URL. */
  slug: string;
  /** Relevant links for the mod, such as issue tracker and wiki. */
  links: ModLinks;
  /** Mod summary. */
  summary: string;
  /** Current mod status. */
  status: ModStatus;
  /** Number of downloads for the mod. */
  downloadCount: number;
  /** Whether the mod is included in the featured mods list. */
  isFeatured: boolean;
  /** The main category of the mod as chosen by its author. */
  primaryCategoryId: number;
  /** List of the mod's categories. */
  categories: Category[];
  /** The class id this mod belongs to. */
  classId: number | null;
  /** List of the mod's authors. */
  authors: ModAuthor[];
  /** The mod's logo asset. */
  logo: ModAsset;
  /** List of screenshot assets. */
  screenshots: ModAsset[];
  /** The id of the mod's main file. */
  mainFileId: number;
  /** List of the mod's latest files. */
  latestFiles: File[];
  /** File related details for the latest files of the mod. */
  latestFilesIndexes: FileIndex[];
  /** File related details for the latest early access files of the mod. */
  latestEarlyAccessFilesIndexes: FileIndex[];
  /** The creation date of the mod. */
  dateCreated: string;
  /** The last time the mod was modified. */
  dateModified: string;
  /** The release date of the mod. */
  dateReleased: string;
  /** Whether the mod is allowed to be distributed. */
  allowModDistribution: boolean | null;
  /** The mod's popularity rank for its game. */
  gamePopularityRank: number;
  /** Whether the mod is available for search (false if experimental, deleted, or alpha-only). */
  isAvailable: boolean;
  /** The mod's thumbs up count. */
  thumbsUpCount: number;
  /** The mod's rating. */
  rating: number | null;
}

/** Featured, popular, and recently updated mods. */
export interface FeaturedModsResponse {
  featured: Mod[];
  popular: Mod[];
  recentlyUpdated: Mod[];
}

/** Query parameters for {@link ModsApi.search}. */
export interface SearchModsOptions extends PaginationOptions {
  /** Filter by game id. */
  gameId: number;
  /** Filter by section id, discoverable via {@link CategoriesApi.list} with `classesOnly`. */
  classId?: number;
  /** Filter by category id. */
  categoryId?: number;
  /** Filter by a list of category ids. Overrides `categoryId`. Maximum of 10 ids. */
  categoryIds?: number[];
  /** Filter by game version string. */
  gameVersion?: string;
  /** Filter by a list of game version strings. Overrides `gameVersion`. Maximum of 4. */
  gameVersions?: string[];
  /** Filter by free text search in mod name and author. */
  searchFilter?: string;
  /** Field to sort results by. */
  sortField?: ModsSearchSortField;
  /** Sort direction. */
  sortOrder?: SortOrder;
  /** Filter mods associated with the given mod loader. Must be used with `gameVersion`. */
  modLoaderType?: ModLoaderType;
  /** Filter by a list of mod loader types. Overrides `modLoaderType`. Maximum of 5. */
  modLoaderTypes?: ModLoaderType[];
  /** Filter mods with files tagged with versions of the given game version type id. */
  gameVersionTypeId?: number;
  /** Filter mods where the given author id is a member. */
  authorId?: number;
  /** Filter mods where the given author id is the primary/owning author. */
  primaryAuthorId?: number;
  /** Filter by slug. Combined with `classId`, this results in a unique result. */
  slug?: string;
}

/** Query parameters for {@link ModsApi.getDescription}. */
export interface GetModDescriptionOptions {
  raw?: boolean;
  stripped?: boolean;
  markup?: boolean;
}

/** Request body for {@link ModsApi.getMods}. */
export interface GetModsByIdsListRequestBody {
  /** List of mod ids. All mods must belong to the same game. */
  modIds: number[];
  filterPcOnly?: boolean | null;
}

/** Request body for {@link ModsApi.getFeatured}. */
export interface GetFeaturedModsRequestBody {
  gameId: number;
  excludedModIds?: number[];
  gameVersionTypeId?: number | null;
}
