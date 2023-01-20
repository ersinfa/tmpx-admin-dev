/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import { BASE_URL } from '../../../lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
  } else if (req.method === 'PATCH') {
    const { userId } = req.query;
    const id = Number(userId);

    if (!userId) return res.status(400).json({ error: 'Missing id' });

    const { name, username, email } = req.body;

    console.log(req.body);
    const user = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
      }),
    });

    console.log(user);

    const userJson = await user.json();

    console.log(userJson);

    res.status(200).json(userJson);
  }
}
