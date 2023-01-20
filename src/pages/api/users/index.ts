/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import { BASE_URL, BEARER_TOKEN } from '../../../lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  const usersJson = await users.json();
  res.status(200).json(usersJson.data);
}
