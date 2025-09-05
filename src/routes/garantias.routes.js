import { Router } from "express";
import {
  getGarantias,
  getGarantiasById,
  createGarantia,
  updateGarantia,
} from "../controllers/garantias.controller.js";

const router = Router();

router.get("/", getGarantias);
router.get("/:id", getGarantiasById);
router.post("/", createGarantia);
router.put("/:id", updateGarantia);

export default router;
