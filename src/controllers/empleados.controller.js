import { pool } from "../config/db.js";

export const getEmpleados = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM empleados ORDER BY empleado_id`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM empleados WHERE empleado_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      dni_cedula,
      cargo,
      departamento,
      salario,
      estado,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO empleados (nombre, apellidos, dni_cedula, cargo, departamento, salario, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, apellidos, dni_cedula, cargo, departamento, salario, estado]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellidos,
      dni_cedula,
      cargo,
      departamento,
      salario,
      estado,
    } = req.body;

    const result = await pool.query(
      `UPDATE empleados
   SET nombre = COALESCE($1, nombre),
       apellidos = COALESCE($2, apellidos),
       dni_cedula = COALESCE($3, dni_cedula),
       cargo = COALESCE($4, cargo),
       departamento = COALESCE($5, departamento),
       salario = COALESCE($6, salario),
       estado = COALESCE($7, estado)
   WHERE empleado_id = $8 RETURNING *`,
      [nombre, apellidos, dni_cedula, cargo, departamento, salario, estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE empleados SET estado = 'Inactivo' WHERE empleado_id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado desactivado", empleado: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
