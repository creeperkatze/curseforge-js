import { describe, it, expect } from 'vitest';
import { resolveAvatarUrl } from '../../src/utils/avatar.js';

describe('resolveAvatarUrl', () => {
  it('substitutes the {0} placeholder with the default size', () => {
    const template = 'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-{0}.png';
    expect(resolveAvatarUrl(template)).toBe(
      'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-300x300.png',
    );
  });

  it('substitutes the {0} placeholder with a custom size', () => {
    const template = 'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-{0}.png';
    expect(resolveAvatarUrl(template, '50x50')).toBe(
      'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-50x50.png',
    );
  });

  it('leaves a URL without a placeholder unchanged', () => {
    const url = 'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-300x300.png';
    expect(resolveAvatarUrl(url)).toBe(url);
  });
});
