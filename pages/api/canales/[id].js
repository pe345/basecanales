import { getCanal, upsertCanal, deleteCanal, initDB } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    await initDB();

    if (req.method === 'GET') {
      const canal = await getCanal(id);
      if (!canal) return res.status(404).json({ error: 'No encontrado' });
      return res.json(canal);
    }

    if (req.method === 'PUT') {
      await upsertCanal({ ...req.body, id });
      return res.json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await deleteCanal(id);
      return res.json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
