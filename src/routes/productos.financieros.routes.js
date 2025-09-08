import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.financieros.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("productos_financieros", "read"),  getProductos);
router.get("/:id", getProductoById);
router.post("/", verifyToken, authorize("productos_financieros", "create"), createProducto);
router.put("/:id", verifyToken, authorize("productos_financieros", "update"), updateProducto);
router.delete("/:id", verifyToken, authorize("productos_financieros", "delete"), deleteProducto);

export default router;
