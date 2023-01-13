import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../../env/server.mjs';
import { BASE_URL } from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: 'Missing id' });

    const response = await fetch(`${BASE_URL}/sessions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    const session = await response.json();

    res.status(200).json(session);
  } else if (req.method === 'POST') {
    console.log('POST');
  }
}
