# Error Handling

All request failures (network errors, timeouts, and API errors) throw a `CurseForgeError`.

## Catching errors

```ts
import CurseForgeClient, { CurseForgeError } from 'curseforge-js';

try {
  await client.mods.get(0);
} catch (err) {
  if (err instanceof CurseForgeError) {
    console.error(err.status, err.message);
  }
}
```

## CurseForgeError properties

| Property | Type | Description |
|---|---|---|
| `message` | `string` | Human-readable description |
| `status` | `number` | HTTP status code, or `0` for network/timeout errors |
| `body` | `unknown` | Raw response body if available |
| `response` | `Response \| undefined` | The raw fetch `Response` if available |

## Common status codes

- `401` / `403` - missing, invalid, or unauthorized API key
- `404` - the requested resource does not exist
- `0` - the request never reached the server (network error, timeout, DNS failure)

## Distinguishing error types

```ts
try {
  await client.mods.search({ gameId: 432 });
} catch (err) {
  if (!(err instanceof CurseForgeError)) throw err; // re-throw unexpected errors

  if (err.status === 0) {
    // Network or timeout - the CurseForge API may be unreachable
  } else if (err.status === 401 || err.status === 403) {
    // Auth failure - check your API key
  } else {
    // API error - inspect err.body for details
  }
}
```
