import { Router } from "express";
import {
  getCuentas,
  getCuentaById,
  createCuenta,
  updateCuenta,
  deleteCuenta,
} from "../controllers/cuentas.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("cuentas", "read"), getCuentas);
router.get("/:id", verifyToken, authorize("cuentas", "read"), getCuentaById);
router.post("/", verifyToken, authorize("cuentas", "create"), createCuenta);
router.put("/:id", verifyToken, authorize("cuentas", "update"), updateCuenta);
router.delete("/:id", verifyToken, authorize("cuentas", "delete"), deleteCuenta);

export default router;
