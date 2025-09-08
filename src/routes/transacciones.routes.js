import { Router } from "express";
import {
  getTransacciones,
  getTransaccionById,
  createTransaccion,
} from "../controllers/transacciones.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("transacciones", "read"), getTransacciones);
router.get("/:id", verifyToken, authorize("transacciones", "read"), getTransaccionById);
router.post("/", verifyToken, authorize("transacciones", "create"), createTransaccion);

export default router;
