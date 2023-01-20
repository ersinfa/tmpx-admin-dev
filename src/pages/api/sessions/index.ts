import { NextApiRequest, NextApiResponse } from 'next/types';
import { BASE_URL, BEARER_TOKEN } from '../../../lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sessions = await fetch(`${BASE_URL}/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    const sessionsJson = await sessions.json();

    res.status(200).json(sessionsJson.data);
  } else if (req.method === 'POST') {
    console.log(req.body);
    const session = await fetch(`${BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });

    const sessionJson = await session.json();

    console.log(sessionJson);

    res.status(200).json(sessionJson.data);
  }
}
