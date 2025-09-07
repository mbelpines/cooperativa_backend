import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUsuario = async (req, res) => {
  try {
    const { empleado_id, username, email, password, rol, estado } = req.body;

    //Validar que el empleado existe
    const empleado = await pool.query(
      `SELECT * FROM empleados WHERE empleado_id = $1`,
      [empleado_id]
    );

    if (empleado.rows.length === 0) {
      return res.status(404).json({ message: "Empleado no existe" });
    }

    //Encriptar password

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (empleado_id, username, email, password, rol, estado) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [empleado_id, username, email, hashedPassword, rol, estado || "Activo"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.usuario_id, u.username, u.email, u.rol, u.estado, e.nombre, e.apellidos, e.cargo FROM usuarios u INNER JOIN empleados e ON u.empleado_id = e.empleado_id ORDER BY u.usuario_id`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT u.usuario_id, u.username, u.email, u.rol, u.estado, e.nombre, e.apellidos, e.cargo FROM usuarios u INNER JOIN empleados e ON u.empleado_id = e.empleado_id WHERE u.usuario_id = $1`,
      [id]
    );

    if (result.rows.lenght === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Actualizar rol o estado
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol, estado } = req.body;

    const result = await pool.query(
      `UPDATE usuarios SET rol=COALESCE($1, rol), estado=COALESCE($2, estado) WHERE usuario_id=$3 RETURNING usuario_id, username, email, rol, estado`,
      [rol, estado, id]
    );

    if (result.rows.lenght === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Desactivar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE usuarios SET estado = 'Inactivo' WHERE usuario_id = $1 RETURNING usuario_id, username, email, rol, estado`,
      [id]
    );

    if (result.rows.lenght === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario desactivado", usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
