import express from "express";

//Importar rutas
import sociosRoutes from "./routes/socios.routes.js";
import cuentasRoutes from "./routes/cuentas.routes.js";
import prestamosRoutes from "./routes/prestamos.routes.js";
import aportacionesRoutes from "./routes/aportaciones.routes.js";
import transaccionesRoutes from "./routes/transacciones.routes.js";
import pagosPrestamosRoutes from "./routes/pagos.prestamos.routes.js";
import garantiasRoutes from "./routes/garantias.routes.js";
import productosFinancierosRoutes from "./routes/productos.financieros.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";

const app = express();
const port = process.env.PORT || 3000;

import cors from "cors";
app.use(cors());

import morgan from "morgan";
app.use(morgan("dev"));

app.use(express.json());

// Rutas
app.use("/api/socios", sociosRoutes);
app.use("/api/cuentas", cuentasRoutes);
app.use("/api/prestamos", prestamosRoutes);
app.use("/api/aportaciones", aportacionesRoutes);
app.use("/api/transacciones", transaccionesRoutes);
app.use("/api/pagos/prestamos", pagosPrestamosRoutes);
app.use("/api/garantias", garantiasRoutes);
app.use("/api/productos/financieros", productosFinancierosRoutes);
app.use("/api/empleados", empleadosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

import { pool } from "./config/db.js";

pool
  .query("SELECT NOW()")
  .then((res) => console.log("Conectada a la DB:", res.rows[0]))
  .catch((err) => console.error("Error de conexión:", err.message));
