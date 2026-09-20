# Files

Browse and download mod files.

## List files for a mod

```ts
const { data: files, pagination } = await client.files.list(238222, {
  gameVersion: '1.20.1',
  pageSize: 20,
});
```

## Get a specific file

```ts
const file = await client.files.get(238222, 3999288);
```

## Get multiple files by id

```ts
const files = await client.files.getFiles({ fileIds: [3999288, 3999289] });
```

## Changelog and download URL

```ts
const changelog = await client.files.getChangelog(238222, 3999288);
const downloadUrl = await client.files.getDownloadUrl(238222, 3999288);
```
