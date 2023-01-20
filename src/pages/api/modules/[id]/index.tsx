import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL, BEARER_TOKEN } from '../../../../lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    // Handle DELETE request
    const { id } = req.query;
    console.log(id);
    // Delete the session
    const response = await fetch(`${BASE_URL}/modules/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
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
