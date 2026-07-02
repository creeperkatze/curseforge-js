import type { PaginationOptions } from './base.js';

/** Approval/lifecycle status of a game, category, or other core entity. */
export enum CoreStatus {
  Draft = 1,
  Test = 2,
  PendingReview = 3,
  Rejected = 4,
  Approved = 5,
  Live = 6,
}

/** Visibility of a game's API. */
export enum CoreApiStatus {
  Private = 1,
  Public = 2,
}

/** Approval status of a game version. */
export enum GameVersionStatus {
  Approved = 1,
  Deleted = 2,
  New = 3,
}

/** Status of a game version type. */
export enum GameVersionTypeStatus {
  Normal = 1,
  Deleted = 2,
}

/** Icon, tile and cover art for a game. */
export interface GameAssets {
  iconUrl: string;
  tileUrl: string;
  coverUrl: string;
}

/** A game available on CurseForge. */
export interface Game {
  id: number;
  name: string;
  slug: string;
  dateModified: string;
  assets: GameAssets;
  status: CoreStatus;
  apiStatus: CoreApiStatus;
}

/** A single named/sluggable version of a game (used by the v2 versions endpoint). */
export interface GameVersion {
  id: number;
  slug: string;
  name: string;
}

/** Game versions grouped by version type (v1 form, plain version strings). */
export interface GameVersionsByType {
  type: number;
  versions: string[];
}

/** Game versions grouped by version type (v2 form, full version objects). */
export interface GameVersionsByType2 {
  type: number;
  versions: GameVersion[];
}

/** A version type belonging to a game (e.g. Minecraft game versions vs. Minecraft mod loaders). */
export interface GameVersionType {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  isSyncable: boolean;
  status: GameVersionTypeStatus;
}

/** Query parameters for {@link GamesApi.list}. */
export type GetGamesOptions = PaginationOptions;
