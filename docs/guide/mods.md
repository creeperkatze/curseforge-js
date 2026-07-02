# Mods

Search for and fetch mods.

## Search mods

```ts
import { ModLoaderType, ModsSearchSortField } from 'curseforge-js';

const { data: mods, pagination } = await client.mods.search({
  gameId: 432,
  classId: 6, // mc-mods
  searchFilter: 'jei',
  gameVersions: ['1.20.1', '1.20.2'],
  modLoaderTypes: [ModLoaderType.Forge],
  sortField: ModsSearchSortField.Popularity,
  sortOrder: 'desc',
  pageSize: 20,
});
```

`categoryIds`, `gameVersions`, and `modLoaderTypes` accept plain arrays, the client takes care of encoding them the way the CurseForge API expects.

## Get a mod

```ts
const mod = await client.mods.get(238222);
```

## Get multiple mods by id

```ts
const mods = await client.mods.getMods({ modIds: [238222, 223794] });
```

## Featured mods

```ts
const { featured, popular, recentlyUpdated } = await client.mods.getFeatured({ gameId: 432 });
```

## Mod description

```ts
const description = await client.mods.getDescription(238222);
```
