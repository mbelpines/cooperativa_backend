import { Router } from "express";
import {
  getAportaciones,
  getAportacionById,
  getAportacionesBySocio,
  createAportacion,
  updateAportacion,
} from "../controllers/aportaciones.controller.js";

const router = Router();

// Rutas de aportaciones
router.get("/", getAportaciones);
router.get("/:id", getAportacionById);
router.get("/socio/:socio_id", getAportacionesBySocio); 
router.post("/", createAportacion);
router.put("/:id", updateAportacion);

export default router;
