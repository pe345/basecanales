import { getCanales, upsertCanal, initDB } from '../../lib/db';

export default async function handler(req, res) {
  try {
    await initDB();

    if (req.method === 'GET') {
      const { search, estado, tier, tipo } = req.query;
      const canales = await getCanales({ search, estado, tier, tipo });
      return res.json(canales);
    }

    if (req.method === 'POST') {
      const data = req.body;
      if (!data.id || !data.empresa) return res.status(400).json({ error: 'ID y Empresa requeridos' });
      await upsertCanal(data);
      return res.json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
