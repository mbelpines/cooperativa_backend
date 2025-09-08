import { Router } from "express";

import {
  getSocios,
  getSocioById,
  createSocio,
  updateSocio,
  deleteSocio,
} from "../controllers/socios.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, authorize("socios", "read"), getSocios);
router.get("/:id", verifyToken, authorize("socios", "read"), getSocioById);
router.post("/", verifyToken, authorize("socios", "create"), createSocio);
router.put("/:id", verifyToken, authorize("socios", "update"), updateSocio);
router.delete("/:id", verifyToken, authorize("socios", "delete"), deleteSocio);

export default router;
