import { Router } from "express";
import {
  getGarantias,
  getGarantiasById,
  createGarantia,
  updateGarantia,
} from "../controllers/garantias.controller.js";

import { verifyToken, authorize } from "../middlewares/authMiddleware.js";


const router = Router();

router.get("/", verifyToken, authorize("garantias", "read"),  getGarantias);
router.get("/:id", verifyToken, authorize("garantias", "read"), getGarantiasById);
router.post("/", verifyToken, authorize("garantias", "create"), createGarantia);
router.put("/:id",  verifyToken, authorize("garantias", "update"), updateGarantia);

export default router;
