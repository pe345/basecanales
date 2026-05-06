import { sql } from '@vercel/postgres';

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS canales (
      id TEXT PRIMARY KEY,
      empresa TEXT,
      tipo TEXT,
      tier TEXT,
      contacto_principal TEXT,
      cargo TEXT,
      rol TEXT,
      email TEXT,
      whatsapp TEXT,
      telefono_fijo TEXT,
      estado TEXT,
      owner TEXT,
      en_crm_principal TEXT,
      en_canales_contactados TEXT,
      productos_lineas TEXT,
      fecha_alta TEXT,
      fecha_ultimo_contacto TEXT,
      proxima_fecha_contacto TEXT,
      proximo_paso TEXT,
      cliente_final_asociado TEXT,
      notas TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function getCanales({ search = '', estado = '', tier = '', tipo = '' } = {}) {
  let conditions = [];
  let params = [];
  let i = 1;

  if (search) {
    conditions.push(`(
      LOWER(empresa) LIKE LOWER($${i}) OR
      LOWER(contacto_principal) LIKE LOWER($${i}) OR
      LOWER(email) LIKE LOWER($${i}) OR
      LOWER(id) LIKE LOWER($${i})
    )`);
    params.push(`%${search}%`);
    i++;
  }
  if (estado) { conditions.push(`estado = $${i++}`); params.push(estado); }
  if (tier)   { conditions.push(`tier = $${i++}`); params.push(tier); }
  if (tipo)   { conditions.push(`tipo = $${i++}`); params.push(tipo); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM canales ${where} ORDER BY id ASC`;

  const { rows } = await sql.query(query, params);
  return rows;
}

export async function getCanal(id) {
  const { rows } = await sql`SELECT * FROM canales WHERE id = ${id}`;
  return rows[0] || null;
}

export async function upsertCanal(data) {
  const {
    id, empresa, tipo, tier, contacto_principal, cargo, rol, email,
    whatsapp, telefono_fijo, estado, owner, en_crm_principal,
    en_canales_contactados, productos_lineas, fecha_alta,
    fecha_ultimo_contacto, proxima_fecha_contacto, proximo_paso,
    cliente_final_asociado, notas
  } = data;

  await sql`
    INSERT INTO canales (
      id, empresa, tipo, tier, contacto_principal, cargo, rol, email,
      whatsapp, telefono_fijo, estado, owner, en_crm_principal,
      en_canales_contactados, productos_lineas, fecha_alta,
      fecha_ultimo_contacto, proxima_fecha_contacto, proximo_paso,
      cliente_final_asociado, notas, updated_at
    ) VALUES (
      ${id}, ${empresa}, ${tipo}, ${tier}, ${contacto_principal}, ${cargo}, ${rol}, ${email},
      ${whatsapp}, ${telefono_fijo}, ${estado}, ${owner}, ${en_crm_principal},
      ${en_canales_contactados}, ${productos_lineas}, ${fecha_alta},
      ${fecha_ultimo_contacto}, ${proxima_fecha_contacto}, ${proximo_paso},
      ${cliente_final_asociado}, ${notas}, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      empresa = EXCLUDED.empresa,
      tipo = EXCLUDED.tipo,
      tier = EXCLUDED.tier,
      contacto_principal = EXCLUDED.contacto_principal,
      cargo = EXCLUDED.cargo,
      rol = EXCLUDED.rol,
      email = EXCLUDED.email,
      whatsapp = EXCLUDED.whatsapp,
      telefono_fijo = EXCLUDED.telefono_fijo,
      estado = EXCLUDED.estado,
      owner = EXCLUDED.owner,
      en_crm_principal = EXCLUDED.en_crm_principal,
      en_canales_contactados = EXCLUDED.en_canales_contactados,
      productos_lineas = EXCLUDED.productos_lineas,
      fecha_alta = EXCLUDED.fecha_alta,
      fecha_ultimo_contacto = EXCLUDED.fecha_ultimo_contacto,
      proxima_fecha_contacto = EXCLUDED.proxima_fecha_contacto,
      proximo_paso = EXCLUDED.proximo_paso,
      cliente_final_asociado = EXCLUDED.cliente_final_asociado,
      notas = EXCLUDED.notas,
      updated_at = NOW()
  `;
}

export async function deleteCanal(id) {
  await sql`DELETE FROM canales WHERE id = ${id}`;
}
