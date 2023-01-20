import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../../env/server.mjs';
import { BASE_URL } from '../../../../lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    // Handle DELETE request
    const { id } = req.query;
    console.log(id);
    // Delete the session
    const response = await fetch(`${BASE_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json(data);
      return;
    }

    res.status(200).json(data);
  }
}
