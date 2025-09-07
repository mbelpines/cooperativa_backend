import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // 🔑 cámbialo en .env

// Login
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Buscar usuario por username o email
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE (username = $1 OR email = $2) AND estado = 'Activo'`,
      [username, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const usuario = result.rows[0];

    // Verificar password
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar JWT
    const token = jwt.sign(
      {
        usuario_id: usuario.usuario_id,
        empleado_id: usuario.empleado_id,
        rol: usuario.rol,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        usuario_id: usuario.usuario_id,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
