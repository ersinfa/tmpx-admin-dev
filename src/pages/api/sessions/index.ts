import { NextApiRequest, NextApiResponse } from 'next/types';
import { env } from '../../../env/server.mjs';
import { BASE_URL } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessions = await fetch(`${BASE_URL}/sessions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${env.BEARER_TOKEN}`,
    },
  });

  const sessionsJson = await sessions.json();

  res.status(200).json(sessionsJson.data);
}
