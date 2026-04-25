import { Router } from "express";
import {
	actualizarSuperheroePorIdController,
	agregarSuperheroeController,
	buscarSuperheoresPorAtributoController,
	eliminarSuperheroePorIdController,
	eliminarSuperheroePorNombreController,
	obtenerSuperheroePorIdController,
	obtenerSuperheroesMayoresDe30Controller,
	obtenerTodosLosSuperheroesController,
	editarSuperheroeController,
	eliminarSuperheroeController
} from "../controllers/superheroController.mjs";

import { handleValidationErrors } from "../middlewares/validations/errorMiddleware.mjs";
import { superheroValidations } from "../middlewares/validations/validationRules.mjs";
import { parseFieldsToArray } from "../middlewares/parseFieldsToArray.mjs";
import { parse } from "dotenv";

const router = Router();

// Ruta dashboard para listar todos los superhéroes
router.get("/heroes",obtenerTodosLosSuperheroesController);

// Ruta GET para mostrar el formulario de agregar superhéroe
router.get("/heroes/agregar", (_req, res) => {
	res.render("addSuperhero"); // Renderiza el formulario
});

// Ruta para procesar el formulario
router.post(
	"/heroes/agregar",
	// Parseamos los campos de strings a arrays (poderes, aliados y enemigos) 
	parseFieldsToArray(["poderes", "aliados", "enemigos"]),
	// Validamos los campos requeridos (nombreSuperheroe, nombreReal, edad  y poderes)
	superheroValidations,
	handleValidationErrors,
	agregarSuperheroeController
);

// Ruta para renderizar el formulario de edición y precargar los datos del superhéroe a editar
// Busca el superhéroe por su atributo id, y se lo pasamos a la vista (editSuperhero.ejs) para que precargue los datos del superhéroe 
router.get("/heroes/:id/editar", obtenerSuperheroePorIdController);

// Ruta PUT para actualizar el superhéroe
router.put(
	"/heroes/:id/editar",
	parseFieldsToArray(["poderes", "aliados", "enemigos"]),
	superheroValidations,
	handleValidationErrors,
	editarSuperheroeController
);

// Ruta DELETE para elimnar un superhéroe por su id
router.delete("/heroes/:id", eliminarSuperheroeController);

// Ruta para buscar y leer un superhéroe por _id
router.get("/heroes/buscar/id/:id", obtenerSuperheroePorIdController);

// Obtener superhéroes mayores de 30, sean el planeta tierra y tengan almenos 2 poderes
router.get("/heroes/mayores-30", obtenerSuperheroesMayoresDe30Controller);

// Ruta para buscar superhéroes por atributo y valor
router.get(
	"/heroes/buscar/:atributo/:valor",
	buscarSuperheoresPorAtributoController,
);

// Agregar un nuevo superhéroe
// router.post(
// 	"/heroes",
// 	superheroValidations,
// 	handleValidationErrors,
// 	agregarSueperheroeController,
// );

// Actualizar un superhéroe por su id
router.put(
	"/heroes/actualizar/:id",
	superheroValidations,
	handleValidationErrors,
	actualizarSuperheroePorIdController
);

// Ruta para eliminar un superheroe por su nombre de superhéroe
router.delete(
	"/heroes/eliminar/:nombreSuperheroe",
	eliminarSuperheroePorNombreController,
);

// Eliminar un superhéroe por id
router.delete("/heroes/eliminar/id/:id", eliminarSuperheroePorIdController);

export default router;
