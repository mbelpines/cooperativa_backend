import { Router } from "express";
import {
  getTransacciones,
  getTransaccionById,
  createTransaccion,
} from "../controllers/transacciones.controller.js";

const router = Router();

router.get("/", getTransacciones);
router.get("/:id", getTransaccionById);
router.post("/", createTransaccion);

export default router;
