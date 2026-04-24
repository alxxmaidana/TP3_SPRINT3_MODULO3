import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConfig.mjs";
import routes from "./routes/superheroRoutes.mjs";
import methodOverride from "method-override";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formulario ()
app.use(express.urlencoded({ extended: true }));
/* express.urlconded -> Middleware para parsear formularios HTML, este analiza los datos enviados y los hace accesibles en req.body { extended: true } -> Permite parsear objetos anidados y estructuras complejas */

// Leer _method del body 
app.use(methodOverride("_method"));

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
