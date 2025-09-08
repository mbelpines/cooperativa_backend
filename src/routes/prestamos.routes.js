import { Router } from "express";
import {
  getPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
} from "../controllers/prestamos.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",  verifyToken, authorize("prestamos", "read"), getPrestamos);
router.get("/:id", verifyToken, authorize("prestamos", "read"), getPrestamoById);
router.post("/", verifyToken, authorize("prestamos", "create"),  createPrestamo);
router.put("/:id", verifyToken, authorize("prestamos", "update"), updatePrestamo);
router.delete("/:id", verifyToken, authorize("prestamos", "delete"),  deletePrestamo);

export default router;
