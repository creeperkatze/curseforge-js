import type { GameVersionStatus, GameVersionTypeStatus } from './games.js';

/** A Minecraft mod loader kind. */
export enum ModLoaderType {
  Any = 0,
  Forge = 1,
  Cauldron = 2,
  LiteLoader = 3,
  Fabric = 4,
  Quilt = 5,
  NeoForge = 6,
}

/** Install method used by a Minecraft mod loader version. */
export enum ModLoaderInstallMethod {
  ForgeInstaller = 1,
  ForgeJarInstall = 2,
  ForgeInstaller_v2 = 3,
  FabricInstaller = 4,
  QuiltInstaller = 5,
  NeoForgeInstaller = 6,
}

/** A single Minecraft game version. */
export interface MinecraftGameVersion {
  id: number;
  gameVersionId: number;
  versionString: string;
  jarDownloadUrl: string;
  jsonDownloadUrl: string;
  approved: boolean;
  dateModified: string;
  gameVersionTypeId: number;
  gameVersionStatus: GameVersionStatus;
  gameVersionTypeStatus: GameVersionTypeStatus;
}

/** A condensed entry describing the latest/recommended version of a Minecraft mod loader. */
export interface MinecraftModLoaderIndex {
  name: string;
  gameVersion: string;
  latest: boolean;
  recommended: boolean;
  dateModified: string;
  type: ModLoaderType;
}

/** Full details for a specific Minecraft mod loader version. */
export interface MinecraftModLoaderVersion {
  id: number;
  gameVersionId: number;
  minecraftGameVersionId: number;
  forgeVersion: string;
  name: string;
  type: ModLoaderType;
  downloadUrl: string;
  filename: string;
  installMethod: ModLoaderInstallMethod;
  latest: boolean;
  recommended: boolean;
  approved: boolean;
  dateModified: string;
  mavenVersionString: string;
  versionJson: string;
  librariesInstallLocation: string;
  minecraftVersion: string;
  additionalFilesJson: string;
  modLoaderGameVersionId: number;
  modLoaderGameVersionTypeId: number;
  modLoaderGameVersionStatus: GameVersionStatus;
  modLoaderGameVersionTypeStatus: GameVersionTypeStatus;
  mcGameVersionId: number;
  mcGameVersionTypeId: number;
  mcGameVersionStatus: GameVersionStatus;
  mcGameVersionTypeStatus: GameVersionTypeStatus;
  installProfileJson: string;
}

/** Query parameters for {@link MinecraftApi.getVersions}. */
export interface GetMinecraftVersionsOptions {
  sortDescending?: boolean;
}

/** Query parameters for {@link MinecraftApi.getModLoaders}. */
export interface GetMinecraftModLoadersOptions {
  /** Filter mod loaders by Minecraft game version. */
  version?: string;
  /** Include all mod loaders, not just the latest/recommended ones. */
  includeAll?: boolean;
}
