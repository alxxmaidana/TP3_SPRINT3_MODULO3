import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConfig.mjs";
import routes from "./routes/superheroRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

// Middleware para parsear JSON y formularios HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* express.urlconded -> Middleware estandar mas utilizado para parsear formularios HTML, este analiza los datos enviados y los hace accesibles en req.body

{ extended: true } -> Permite parsear objetos anidados y estructuras complejas

*/

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
