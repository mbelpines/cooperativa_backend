import { Router } from "express";
import {
  getPago,
  getPagoById,
  getPagosByPrestamo,
  createPago,
  updatePago,
} from "../controllers/pagos.prestamos.controller.js";

const router = Router();

router.get("/", getPago);
router.get("/:id", getPagoById);
router.get("/prestamo/:prestamos_id", getPagosByPrestamo);
router.post("/", createPago);
router.put("/:id", updatePago);

export default router;
