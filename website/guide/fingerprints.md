# Fingerprints

Identify local mod files by matching their Murmur2 fingerprints against CurseForge's file index, this is how launchers detect which mods are already installed.

## Match a list of fingerprints

```ts
const result = await client.fingerprints.getMatches([123456789, 987654321]);

for (const match of result.exactMatches) {
  console.log(match.file.displayName);
}
```

Scope the match to a single game by passing a `gameId`:

```ts
const result = await client.fingerprints.getMatches([123456789], 432);
```

## Fuzzy matching

Fuzzy matching groups fingerprints by folder, useful for matching a whole modpack directory at once.

```ts
const result = await client.fingerprints.getFuzzyMatches([
  { foldername: 'mods', fingerprints: [123456789, 987654321] },
]);

for (const match of result.fuzzyMatches) {
  console.log(match.file.displayName);
}
```
