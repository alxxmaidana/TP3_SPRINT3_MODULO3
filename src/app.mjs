import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConfig.mjs";
import routes from "./routes/superheroRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

// Middleware para parsear JSON
app.use(express.json());
// Configurar EJS cómo el motor de vistas
app.set("view engine", "ejs");

app.use("/api", routes);

// Manejo de errores para rutas no encontradas
app.use((_req, res) => {
	res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
	console.log("Servidor escuchado en el puerto:", PORT);
});
