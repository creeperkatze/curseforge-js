/**
 * A CurseForge user.
 *
 * @remarks
 * Undocumented; fields reflect observed usage, not a confirmed schema.
 * `avatarUrl` is templated,  pass it through {@link resolveAvatarUrl} before use.
 */
export interface User {
  id: number;
  displayName: string;
  avatarUrl: string;
  dateCreated: string;
}
