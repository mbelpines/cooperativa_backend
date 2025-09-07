import { pool } from "../config/db.js";

export const getProductos = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM productos_financieros ORDER BY producto_id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM productos_financieros WHERE producto_id=$1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      tasa_interes,
      plazo_minimo,
      plazo_maximo,
      monto_minimo,
      monto_maximo,
      estado,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO productos_financieros (nombre, descripcion, tasa_interes, plazo_minimo, plazo_maximo, monto_minimo, monto_maximo, estado) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        nombre,
        descripcion,
        tasa_interes,
        plazo_minimo,
        plazo_maximo,
        monto_minimo,
        monto_maximo,
        estado,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      plazo_minimo,
      descripcion,
      tasa_interes,
      plazo_maximo,
      monto_minimo,
      monto_maximo,
      estado,
    } = req.body;

    const result = await pool.query(
      `UPDATE productos_financieros 
       SET nombre = COALESCE($1, nombre),
           descripcion = COALESCE($2, descripcion),
           tasa_interes = COALESCE($3, tasa_interes),
           plazo_minimo = COALESCE($4, plazo_minimo),
           plazo_maximo = COALESCE($5, plazo_maximo),
           monto_minimo = COALESCE($6, monto_minimo),
           monto_maximo = COALESCE($7, monto_maximo),
           estado = COALESCE($8, estado)
       WHERE producto_id = $9 RETURNING *`,
      [
        nombre,
        descripcion,
        tasa_interes,
        plazo_minimo,
        plazo_maximo,
        monto_minimo,
        monto_maximo,
        estado,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE productos_financieros SET estado = 'Inactivo' WHERE producto_id=$1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
