import { pool } from "../config/db.js";

export const getAportaciones = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM aportaciones ORDER BY aportacion_id`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAportacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM aportaciones WHERE aportacion_id = $1`,
      [id]
    );

    if (result.rows.lenth === 0) {
      return res.status(404).json({ message: "Aportación no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAportacionesBySocio = async (req, res) => {
  try {
    const { socio_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM aportaciones 
       WHERE socio_id = $1 
       ORDER BY fecha DESC`,
      [socio_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron aportaciones para este socio" });
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAportacion = async (req, res) => {
  try {
    const { socio_id, monto, fecha, tipo, estado } = req.body;

    const result = await pool.query(
      `INSERT INTO aportaciones (socio_id, monto, fecha, tipo, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [socio_id, monto, fecha, tipo, estado]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAportacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; 

    const result = await pool.query(
      `UPDATE aportaciones SET estado = $1 WHERE aportacion_id = $2 RETURNING *`,
      [estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Aportación no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
