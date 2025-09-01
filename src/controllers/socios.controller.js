import { pool } from "../config/db.js";

// Obtener todos los socios
export const getSocios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM socios ORDER BY socio_id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener socio por ID
export const getSocioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM socios WHERE socio_id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear socio
export const createSocio = async (req, res) => {
  try {
    const { numero_socio, nombre, apellidos, dni_cedula, estado, tipo_socio } = req.body;

    const result = await pool.query(
      `INSERT INTO socios (numero_socio, nombre, apellidos, dni_cedula, estado, tipo_socio)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [numero_socio, nombre, apellidos, dni_cedula, estado, tipo_socio]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar socio
export const updateSocio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, telefono, email, estado, tipo_socio } = req.body;

    const result = await pool.query(
      `UPDATE socios SET
          nombre = $1,
          apellidos = $2,
          telefono = $3,
          email = $4,
          estado = $5,
          tipo_socio = $6
        WHERE socio_id = $7 RETURNING *`,
      [nombre, apellidos, telefono, email, estado, tipo_socio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar socio
export const deleteSocio = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM socios WHERE socio_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.json({ message: "Socio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
