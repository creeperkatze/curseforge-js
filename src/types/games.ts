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
  iconUrl: string | null;
  tileUrl: string | null;
  coverUrl: string | null;
}

/** Feature flags describing what a game supports. */
export interface GameSupportedFeatures {
  supportModSubscriptions: boolean;
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
  supportedFeatures: GameSupportedFeatures;
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

/**
 * Game ids on CurseForge, as returned by {@link GamesApi.list}.
 * @remarks Not part of the CurseForge API contract, games are added over time and this list can go stale. Use {@link GamesApi.list} for the authoritative, current list.
 */
export enum GameId {
  WorldOfWarcraft = 1,
  TheSecretWorld = 64,
  StarCraftII = 65,
  RunesOfMagic = 335,
  WorldOfTanks = 423,
  Rift = 424,
  Terraria = 431,
  Minecraft = 432,
  WildStar = 454,
  TheElderScrollsOnline = 455,
  DarkestDungeon = 608,
  StardewValley = 669,
  SidMeiersCivilizationVI = 727,
  KerbalSpaceProgram = 4401,
  SecretWorldLegends = 4455,
  FinalFantasyIV = 4741,
  FinalFantasyVI = 4773,
  FinalFantasyII = 5001,
  FinalFantasyV = 5021,
  FinalFantasyIII = 5026,
  FinalFantasyI = 5230,
  SurvivingMars = 61489,
  MinecraftDungeons = 69271,
  AmongUs = 69761,
  Hytale = 70216,
  ChroniclesOfArcadia = 70667,
  MinecraftBedrock = 78022,
  TheSims4 = 78062,
  Demeo = 78135,
  ArkSurvivalAscended = 83374,
  RushdownRevolt = 84062,
  TennisElbow4 = 84137,
  Palworld = 85196,
  Helldivers2 = 85440,
  HogwartsLegacy = 87986,
  InZoi = 88849,
  Windrose = 99078,
  Subnautica2 = 99704,
}
