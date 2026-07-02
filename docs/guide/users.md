# Users

> [!NOTE]
> `GET /v1/users/{userId}` is not part of CurseForge's published API reference. It works in practice, but the response shape below reflects only the fields observed in real use, not a confirmed official schema.

## Get a user

```ts
const user = await client.users.get(1);
```

## Avatar URL

`avatarUrl` is a templated URL containing a literal `{0}` placeholder, a legacy artifact of CurseForge's Twitch-based avatar system. It is never directly fetchable; resolve it with `resolveAvatarUrl` before using it as an image URL:

```ts
import { resolveAvatarUrl } from 'curseforge-js';

const avatarUrl = resolveAvatarUrl(user.avatarUrl); // defaults to size "300x300"
const smallAvatarUrl = resolveAvatarUrl(user.avatarUrl, '50x50');
```
