import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../../env/server.mjs';
import { BASE_URL } from '../../../../lib/constants';
import { Module, Session } from '../../../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const response = await fetch(`${BASE_URL}/sessions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    const session = (await response.json()) as Session;

    const modules = await fetch(`${BASE_URL}/modules?sessionId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    const modulesJson = (await modules.json()) as Module[];

    session.modules = modulesJson;

    const documents = await fetch(`${BASE_URL}/documents?sessionId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    const documentsJson = await documents.json();

    session.documents = documentsJson;

    console.log(session);

    res.status(200).json(session);
  } else if (req.method === 'POST') {
  } else if (req.method === 'DELETE') {
    const response = await fetch(`${BASE_URL}/sessions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Session deleted' });

      return;
    }

    res.status(400).json({ error: 'Something went wrong' });
  } else if (req.method === 'CREATE') {
  } else if (req.method === 'PUT') {
    // update session details
    const response = await fetch(`${BASE_URL}/sessions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.BEARER_TOKEN}`,
      },
      body: req.body,
    });

    const session = await response.json();

    const parsedBody = JSON.parse(req.body);
    // update modules
    const updatedModules = await Promise.all(
      parsedBody.modules.map(async (module: Module) => {
        const response = await fetch(`${BASE_URL}/modules/${module.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${env.BEARER_TOKEN}`,
          },
          body: JSON.stringify(module),
        });

        const updatedModule = await response.json();

        return updatedModule;
      })
    );

    session.modules = updatedModules;

    // update documents
    const updatedDocuments = await Promise.all(
      parsedBody.documents.map(async (document: Module) => {
        const response = await fetch(`${BASE_URL}/documents/${document.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${env.BEARER_TOKEN}`,
          },
          body: JSON.stringify(document),
        });

        const updatedDocument = await response.json();

        return updatedDocument;
      })
    );

    session.documents = updatedDocuments;

    console.log(session);

    res.status(200).json(session);
  }
}
