import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("usuarios", "read"), getUsuarios);
router.get("/:id", verifyToken, authorize("usuarios", "read"),  getUsuarioById);
router.post("/", verifyToken, authorize("usuarios", "create"), createUsuario);
router.put("/:id", verifyToken, authorize("usuarios", "update"), updateUsuario);
router.delete("/:id", verifyToken, authorize("usuarios", "delete"), deleteUsuario);

export default router;
