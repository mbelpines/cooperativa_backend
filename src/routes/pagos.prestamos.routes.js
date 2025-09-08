import { Router } from "express";
import {
  getPago,
  getPagoById,
  getPagosByPrestamo,
  createPago,
  updatePago,
} from "../controllers/pagos.prestamos.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("pagos_prestamos", "read"), getPago);
router.get("/:id", verifyToken, authorize("pagos_prestamos", "read"), getPagoById);
router.get("/prestamo/:prestamos_id", verifyToken, authorize("pagos_prestamos", "read"), getPagosByPrestamo);
router.post("/", verifyToken, authorize("pagos_prestamos", "create"), createPago);
router.put("/:id", verifyToken, authorize("pagos_prestamos", "update"), updatePago);

export default router;
