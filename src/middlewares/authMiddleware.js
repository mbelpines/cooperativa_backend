import jwt from "jsonwebtoken";
import permisos from "../config/permisos.json" assert { type: "json" };

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Verifica que el token JWT sea válido
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // usuario_id, empleado_id, rol
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

/**
 * Verifica si el rol del usuario tiene acceso a la acción en el módulo
 * @param {string} module - nombre del módulo (ej: "prestamos")
 * @param {string} action - acción (ej: "create", "read", "update", "delete")
 */
export const authorize = (module, action) => {
  return (req, res, next) => {
    const rol = req.user?.rol;

    if (!rol) {
      return res.status(401).json({ message: "Rol no encontrado en el token" });
    }

    if (!permisos[module] || !permisos[module][action]) {
      return res.status(403).json({ message: "Acceso denegado: módulo o acción no definidos" });
    }

    if (!permisos[module][action].includes(rol)) {
      return res.status(403).json({ message: "Acceso denegado: rol insuficiente" });
    }

    next();
  };
};
