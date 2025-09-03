import { pool } from "../config/db.js";

export const getTransacciones = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM transacciones ORDER BY transaccion_id`
    );

    res.json(result.rows);
  } catch (error) {
    res.json(500).json({ error: error.message });
  }
};

export const getTransaccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha, descripcion, cuenta_destino_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    );

    if (result.rows.lenght === 0) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear transacción (Depósito, Retiro, Transferencia)
export const createTransaccion = async (req, res) => {
  const client = await pool.connect();
  try {
    const { cuenta_id, tipo, monto, descripcion, cuenta_destino_id } = req.body;

    // Validar que la cuenta existe
    const cuentaOrigen = await client.query(
      "SELECT * FROM cuentas WHERE cuenta_id = $1 AND estado = 'Activa'",
      [cuenta_id]
    );

    if (cuentaOrigen.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Cuenta origen no encontrada o inactiva" });
    }

    // Iniciar transacción SQL
    await client.query("BEGIN");

    let result;

    // Caso 1: Depósito
    if (tipo === "Depósito") {
      await client.query(
        "UPDATE cuentas SET saldo_actual = saldo_actual + $1 WHERE cuenta_id = $2",
        [monto, cuenta_id]
      );

      result = await client.query(
        `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha, descripcion) 
         VALUES ($1, $2, $3, NOW(), $4) RETURNING *`,
        [cuenta_id, tipo, monto, descripcion]
      );
    }

    // Caso 2: Retiro
    else if (tipo === "Retiro") {
      const saldoActual = cuentaOrigen.rows[0].saldo_actual;
      if (saldoActual < monto) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Fondos insuficientes" });
      }

      await client.query(
        "UPDATE cuentas SET saldo_actual = saldo_actual - $1 WHERE cuenta_id = $2",
        [monto, cuenta_id]
      );

      result = await client.query(
        `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha, descripcion) 
         VALUES ($1, $2, $3, NOW(), $4) RETURNING *`,
        [cuenta_id, tipo, monto, descripcion]
      );
    }

    // Caso 3: Transferencia
    else if (tipo === "Transferencia") {
      // Validar cuenta destino
      const cuentaDestino = await client.query(
        "SELECT * FROM cuentas WHERE cuenta_id = $1 AND estado = 'Activa'",
        [cuenta_destino_id]
      );

      if (cuentaDestino.rows.length === 0) {
        await client.query("ROLLBACK");
        return res
          .status(404)
          .json({ message: "Cuenta destino no encontrada o inactiva" });
      }

      const saldoActual = cuentaOrigen.rows[0].saldo_actual;
      if (saldoActual < monto) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "Fondos insuficientes" });
      }

      // Debitar origen
      await client.query(
        "UPDATE cuentas SET saldo_actual = saldo_actual - $1 WHERE cuenta_id = $2",
        [monto, cuenta_id]
      );

      // Acreditar destino
      await client.query(
        "UPDATE cuentas SET saldo_actual = saldo_actual + $1 WHERE cuenta_id = $2",
        [monto, cuenta_destino_id]
      );

      // Insertar transacción en cuenta origen
      await client.query(
        `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha, descripcion, cuenta_destino_id) 
         VALUES ($1, $2, $3, NOW(), $4, $5)`,
        [cuenta_id, "Transferencia", -monto, descripcion, cuenta_destino_id]
      );

      // Insertar transacción en cuenta destino
      result = await client.query(
        `INSERT INTO transacciones (cuenta_id, tipo, monto, fecha, descripcion, cuenta_destino_id) 
         VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *`,
        [cuenta_destino_id, "Transferencia", monto, descripcion, cuenta_id]
      );
    }

    // Commit de la transacción
    await client.query("COMMIT");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};
