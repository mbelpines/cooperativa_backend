import { pool } from "../config/db.js";

//Obtener todas las cuentas
export const getCuentas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cuentas ORDER BY cuenta_id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener Cuenta por ID
export const getCuentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM cuentas WHERE cuenta_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }
  } catch (error) {
    res.json(result(500)).json({ error: error.message });
  }
};

//Crear cuenta
export const createCuenta = async (req, res) => {
  try {
    const {
      socio_id,
      numero_cuenta,
      tipo_cuenta,
      fecha_apertura,
      saldo_actual,
      estado,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cuentas (socio_id, numero_cuenta, tipo_cuenta, fecha_apertura, saldo_actual, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        socio_id,
        numero_cuenta,
        tipo_cuenta,
        fecha_apertura,
        saldo_actual,
        estado,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Actualizar cuenta
export const updateCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_cuenta, estado } = req.body;

    const result = await pool.query(
      `UPDATE cuentas SET
            tipo_cuenta = $1,
            estado = $2
            WHERE cuenta_id = $3 RETURNING *`,
      [tipo_cuenta, estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Eliminar cuenta
export const deleteCuenta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM cuentas WHERE cuenta_id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cuenta no encontrada}" });
    }

    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
