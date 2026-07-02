# Games & Categories

Browse the games available on CurseForge, their versions, and mod categories.

## List and get games

```ts
const { data: games, pagination } = await client.games.list({ pageSize: 50 });
const minecraft = await client.games.get(432);
```

## Game versions

```ts
// Plain version strings grouped by version type
const versions = await client.games.getVersions(432);

// Full version objects grouped by version type
const versionsV2 = await client.games.getVersionsV2(432);

// The version types themselves (e.g. Minecraft versions vs. mod loaders)
const versionTypes = await client.games.getVersionTypes(432);
```

## Categories

Fetch all classes (top-level categories) for a game, or the categories under a specific class.

```ts
const classes = await client.categories.list({ gameId: 432, classesOnly: true });
const modCategories = await client.categories.list({ gameId: 432, classId: 6 });
```

## Minecraft-specific data

The `minecraft` namespace exposes convenience endpoints for Minecraft game versions and mod loaders.

```ts
const mcVersions = await client.minecraft.getVersions({ sortDescending: true });
const mcVersion = await client.minecraft.getVersion('1.20.1');

const modLoaders = await client.minecraft.getModLoaders({ version: '1.20.1' });
const forge = await client.minecraft.getModLoader('forge-47.2.0-1.20.1');
```
