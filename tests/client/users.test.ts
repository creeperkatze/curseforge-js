import { describe, it, expect } from 'vitest';
import { createTestClient } from '../utils/client.js';
import { jsonResponse } from '../utils/http.js';
import type { User } from '../../src/types/index.js';

const MOCK_USER: User = {
  id: 1,
  displayName: 'mezz',
  avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/mezz-profile_image-{0}.png',
  dateCreated: '2019-08-24T14:15:22Z',
};

describe('UsersApi', () => {
  it('gets a single user and unwraps the data envelope', async () => {
    const { client, mockFetch } = createTestClient([jsonResponse({ data: MOCK_USER })]);
    const user = await client.users.get(1);
    expect(user).toEqual(MOCK_USER);
    expect(mockFetch.lastCall()?.url).toContain('/v1/users/1');
  });
});
