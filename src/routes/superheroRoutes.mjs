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
} from "../controllers/superheroController.mjs";

import { handleValidationErrors } from "../middlewares/validations/errorMiddleware.mjs";
import { superheroValidations } from "../middlewares/validations/validationRules.mjs";
import { parseFieldsToArray } from "../middlewares/parseFieldsToArray.mjs";

const router = Router();

// Ruta dashboard para listar todos los superhéroes
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Ruta GET para mostrar el formulario
router.get("/heroes/agregar", (_req, res) => {
	res.render("addSuperhero"); // Renderiza el formulario
});

// Ruta para procesar el formulario
router.post(
	"/heroes/agregar",
	parseFieldsToArray(["poderes", "aliados", "enemigos"]), // Parseamos los campos -> poderes, aliados y enemigos antes de aplicarle las validaciones
	superheroValidations,
	handleValidationErrors,
	agregarSuperheroeController
);

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
