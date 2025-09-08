import { Router } from "express";

import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleados.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("empleados", "read"), getEmpleados);
router.get(
  "/:id",
  verifyToken,
  authorize("empleados", "read"),
  getEmpleadoById
);
router.post("/", verifyToken, authorize("empleados", "create"), createEmpleado);
router.put(
  "/:id",
  verifyToken,
  authorize("empleados", "update"),
  updateEmpleado
);
router.delete(
  "/:id",
  verifyToken,
  authorize("empleados", "delete"),
  deleteEmpleado
);

export default router;
