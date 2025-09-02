import express from "express";
import sociosRoutes from "./routes/socios.routes.js";
import cuentasRoutes from "./routes/cuentas.routes.js";
import prestamosRoutes from "./routes/prestamos.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use("/api/socios", sociosRoutes);
app.use("/api/cuentas", cuentasRoutes);
app.use("/api/prestamos", prestamosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

import { pool } from "./config/db.js";

pool
  .query("SELECT NOW()")
  .then((res) => console.log("Conectada a la DB:", res.rows[0]))
  .catch((err) => console.error("Error de conexión:", err.message));
