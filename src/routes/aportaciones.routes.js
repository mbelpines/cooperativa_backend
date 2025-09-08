import { Router } from "express";
import {
  getAportaciones,
  getAportacionById,
  getAportacionesBySocio,
  createAportacion,
  updateAportacion,
} from "../controllers/aportaciones.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas de aportaciones
router.get("/", verifyToken, authorize("aportaciones", "read"), getAportaciones);
router.get("/:id", verifyToken, authorize("aportaciones", "read"), getAportacionById);
router.get("/socio/:socio_id", verifyToken, authorize("aportaciones", "read"), getAportacionesBySocio); 
router.post("/", verifyToken, authorize("aportaciones", "create"), createAportacion);
router.put("/:id", verifyToken, authorize("aportaciones", "update"), updateAportacion);

export default router;
