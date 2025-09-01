import express from "express";
import sociosRoutes from "./routes/socios.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use("/socios", sociosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

import { pool } from "./config/db.js";

pool.query("SELECT NOW()")
  .then(res => console.log("Conectada a la DB:", res.rows[0]))
  .catch(err => console.error("Error de conexión:", err.message));
