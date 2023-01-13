/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import { BASE_URL } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const id = Number(userId);

  if (!userId) return res.status(400).json({ error: 'Missing id' });

  const user = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${env.BEARER_TOKEN}`,
    },
  });
  
  const userJson = await user.json();

  res.status(200).json(userJson);
}
