# Getting Started

## Installation

::: code-group

```sh [npm]
npm install curseforge-js
```

```sh [pnpm]
pnpm add curseforge-js
```

```sh [yarn]
yarn add curseforge-js
```

```sh [bun]
bun add curseforge-js
```

:::

## Get an API key

- **Game developers**: create a CurseForge for Studios account at [console.curseforge.com](https://console.curseforge.com/) and generate a key from the dashboard.
- **Third parties**: request a key via [this form](https://forms.monday.com/forms/dce5ccb7afda9a1c21dab1a1aa1d84eb?r=use1).

> [!WARNING]
> CurseForge states that any registered account which is not a game developer and did not request a key through the form above will be deleted.

## Create a client

```ts
import CurseForgeClient from 'curseforge-js';

const client = new CurseForgeClient({
  apiKey: 'your-api-key',
  userAgent: 'my-app/1.0',
});
```

## Fetch some data

```ts
const minecraft = await client.games.get(432);
const mod = await client.mods.get(238222);
const files = await client.files.list(238222);
```

## Common options

```ts
const client = new CurseForgeClient({
  baseUrl: 'https://api.curseforge.com',
  apiKey: 'your-api-key',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

## Where to go next

- See [Error Handling](/guide/error-handling) for catching and inspecting errors
- See [Games & Categories](/guide/games) for browsing games and mod categories
- See [Mods](/guide/mods) for searching and fetching mods
- See [API Reference](/api/) for the generated public API docs
