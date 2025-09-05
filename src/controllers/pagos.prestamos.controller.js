import { pool } from "../config/db.js";

export const getPago = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pagos_prestamos ORDER BY pago_id"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPagoById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM pagos_prestamos WHERE pago_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPagosByPrestamo = async (req, res) => {
  try {
    const { prestamo_id } = req.params;

    const result = await pool.query(
      "SELECT * FROM pagos_prestamos WHERE prestamo_id = $1 ORDER BY numero_cuota",
      [prestamo_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay pagos registrados para este préstamo" });
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createPago = async (req, res) => {
  try {
    const {
      prestamo_id,
      numero_cuota,
      monto_capital,
      monto_interes,
      fecha_vencimiento,
      fecha_pago,
      estado,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO pagos_prestamos 
       (prestamo_id, numero_cuota, monto_capital, monto_interes, fecha_vencimiento, fecha_pago, estado) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        prestamo_id,
        numero_cuota,
        monto_capital,
        monto_interes,
        fecha_vencimiento,
        fecha_pago,
        estado,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, fecha_pago } = req.body;

    const result = await pool.query(
      `UPDATE pagos_prestamos SET estado = COALESCE($1, estado), fecha_pago = COALESCE($2, fecha_pago) WHERE pago_id = $3 RETURNING *`,
      [estado, fecha_pago, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
