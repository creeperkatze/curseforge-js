const DEFAULT_AVATAR_SIZE = '300x300';

/**
 * Resolves a {@link User.avatarUrl} template into a fetchable image URL by substituting its
 * `{0}` size placeholder — a legacy artifact of CurseForge's Twitch-based avatar system.
 * @param avatarUrl - The templated `avatarUrl` value from a {@link User}.
 * @param size - Size token to substitute, e.g. `50x50`, `70x70`, `150x150`.
 * @defaultValue size "300x300"
 */
export function resolveAvatarUrl(avatarUrl: string, size: string = DEFAULT_AVATAR_SIZE): string {
  return avatarUrl.replace('{0}', size);
}
