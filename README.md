# curseforge-js

A framework-agnostic JavaScript client for the [CurseForge API](https://docs.curseforge.com).

[![NPM Version](https://img.shields.io/npm/v/curseforge-js)](https://www.npmjs.com/package/curseforge-js)
[![NPM Downloads](https://img.shields.io/npm/dt/curseforge-js)](https://www.npmjs.com/package/curseforge-js)
[![GitHub Branch Check Runs](https://img.shields.io/github/check-runs/creeperkatze/curseforge-js/main)](https://github.com/creeperkatze/curseforge-js/actions)
[![Codecov](https://img.shields.io/codecov/c/github/creeperkatze/curseforge-js)](https://codecov.io/github/creeperkatze/curseforge-js)
[![GitHub Issues](https://img.shields.io/github/issues/creeperkatze/curseforge-js)](https://github.com/creeperkatze/curseforge-js/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/creeperkatze/curseforge-js)](https://github.com/creeperkatze/curseforge-js/pulls)
[![GitHub Repo stars](https://img.shields.io/github/stars/creeperkatze/curseforge-js?style=flat)](https://github.com/creeperkatze/curseforge-js/stargazers)

[📚 Docs](https://curseforge-js.creeperkatze.dev/) •
[🚀 Getting Started](https://curseforge-js.creeperkatze.dev/guide/getting-started) •
[📖 API Reference](https://curseforge-js.creeperkatze.dev/api) •
[📝 Changelog](https://github.com/creeperkatze/curseforge-js/releases)

## 📦 Installation

```sh
npm install curseforge-js
pnpm add curseforge-js
yarn add curseforge-js
bun add curseforge-js
```

## 🚀 Usage

```ts
import CurseForgeClient from 'curseforge-js';

const client = new CurseForgeClient({
  apiKey: 'your-api-key',
  userAgent: 'my-app/1.0',
});

const mod = await client.mods.get(238222);
const files = await client.files.list(238222);

console.log(mod);
console.log(files);
```

## 📖 API

### `new CurseForgeClient(options)`

```ts
const client = new CurseForgeClient({
  baseUrl: 'https://api.curseforge.com',
  apiKey: 'your-api-key',
  timeoutMs: 10_000,
  userAgent: 'my-app/1.0',
});
```

### Options

```ts
interface CurseForgeClientOptions {
  baseUrl?: string;   // default: "https://api.curseforge.com"
  apiKey?: string;
  timeoutMs?: number; // default: 10000
  userAgent?: string;
  fetch?: typeof globalThis.fetch;
}
```

### Selected Methods

Games:
- `client.games.list(options?)`
- `client.games.get(gameId)`
- `client.games.getVersions(gameId)`
- `client.games.getVersionsV2(gameId)`
- `client.games.getVersionTypes(gameId)`

Categories:
- `client.categories.list(options)`

Minecraft:
- `client.minecraft.getVersions(options?)`
- `client.minecraft.getVersion(gameVersionString)`
- `client.minecraft.getModLoaders(options?)`
- `client.minecraft.getModLoader(modLoaderName)`

Mods:
- `client.mods.search(options)`
- `client.mods.get(modId)`
- `client.mods.getMods(body)`
- `client.mods.getFeatured(body)`
- `client.mods.getDescription(modId, options?)`

Files:
- `client.files.get(modId, fileId)`
- `client.files.list(modId, options?)`
- `client.files.getFiles(body)`
- `client.files.getChangelog(modId, fileId)`
- `client.files.getDownloadUrl(modId, fileId)`

Fingerprints:
- `client.fingerprints.getMatches(fingerprints, gameId?)`
- `client.fingerprints.getFuzzyMatches(fingerprints, gameId?)`

Users:
- `client.users.get(userId)`

## 🔐 Authentication

Get an API key from [console.curseforge.com](https://console.curseforge.com/), then pass it at client creation time. It is sent as the `x-api-key` header on every request.

```ts
const client = new CurseForgeClient({
  apiKey: 'your-api-key',
});

const mod = await client.mods.get(238222);
```

## 🌐 Custom Fetch

You can inject your own `fetch` implementation.

```ts
import CurseForgeClient from 'curseforge-js';
import fetch from 'node-fetch';

const client = new CurseForgeClient({
  apiKey: 'your-api-key',
  fetch,
});
```

## ⚠️ Error Handling

All request, timeout, and API errors are thrown as `CurseForgeError`.

```ts
import CurseForgeClient, { CurseForgeError } from 'curseforge-js';

const client = new CurseForgeClient({ apiKey: 'your-api-key' });

try {
  await client.mods.get(0);
} catch (error) {
  if (error instanceof CurseForgeError) {
    console.error(error.status);
    console.error(error.message);
    console.error(error.body);
  }
}
```

## 👨‍💻 Development

```sh
pnpm build

pnpm test
```

## 🤝 Contributing

Contributions are always welcome!

Please ensure you run `pnpm lint:fix` before opening a pull request.

## 📜 License

AGPL-3.0
