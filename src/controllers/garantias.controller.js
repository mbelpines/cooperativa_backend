import { pool } from "../config/db.js";

export const getGarantias = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM garantias ORDER BY garantia_id`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGarantiasById = async (req, res) => {
  try {
    const { prestamo_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM garantias WHERE garantia_id = $1`,
      [prestamo_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron garantias para este préstamo" });
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGarantia = async (req, res) => {
  try {
    const { prestamo_id, tipo, descripcion, valor_estimado, documentos } = req.body;

    const result = await pool.query(
      `INSERT INTO garantias (prestamo_id, tipo, descripcion, valor_estimado, documentos) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [prestamo_id, tipo, descripcion, valor_estimado, documentos]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGarantia = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, descripcion, valor_estimado, documentos } = req.body;

    const result = await pool.query(
      `UPDATE garantias 
       SET tipo = COALESCE($1, tipo), 
           descripcion = COALESCE($2, descripcion), 
           valor_estimado = COALESCE($3, valor_estimado), 
           documentos = COALESCE($4, documentos) 
       WHERE garantia_id = $5 RETURNING *`,
      [tipo, descripcion, valor_estimado, documentos, id] 
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Garantía no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
