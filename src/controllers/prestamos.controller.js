import { pool } from "../config/db.js";

// Obtener todos los préstamos
export const getPrestamos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM prestamos ORDER BY prestamo_id"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener préstamo por ID
export const getPrestamoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM prestamos WHERE prestamo_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear préstamo
export const createPrestamo = async (req, res) => {
  try {
    const {
      socio_id,
      monto_solicitado,
      monto_aprobado,
      tasa_interes,
      plazo_meses,
      fecha_solicitud,
      fecha_aprobacion,
      fecha_desembolso,
      estado,
      producto_id
    } = req.body;

    const result = await pool.query(
      `INSERT INTO prestamos 
        (socio_id, monto_solicitado, monto_aprobado, tasa_interes, plazo_meses, fecha_solicitud, fecha_aprobacion, fecha_desembolso, estado, producto_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        socio_id,
        monto_solicitado,
        monto_aprobado,
        tasa_interes,
        plazo_meses,
        fecha_solicitud,
        fecha_aprobacion,
        fecha_desembolso,
        estado,
        producto_id
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado de un préstamo
export const updatePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await pool.query(
      `UPDATE prestamos SET estado = $1 WHERE prestamo_id = $2 RETURNING *`,
      [estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar préstamo
export const deletePrestamo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM prestamos WHERE prestamo_id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json({ message: "Préstamo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
