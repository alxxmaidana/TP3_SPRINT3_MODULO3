import { Router } from "express";
import {
	actualizarSuperheroePorIdController,

	buscarSuperheoresPorAtributoController,
	eliminarSuperheroePorIdController,
	eliminarSuperheroePorNombreController,
	obtenerSuperheroePorIdController,
	obtenerSuperheroesMayoresDe30Controller,
	obtenerTodosLosSuperheroesController,
	agregarSuperheroeController
} from "../controllers/superheroController.mjs";
import { handleValidationErrors } from "../validations/errorMiddleware.mjs";
import { superheroValidationRules } from "../validations/validationRules.mjs";

const router = Router();

// Ruta dashboard para listar todos los superhéroes
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Ruta GET para mostra el formulario
router.get("/heroes/agregar", (_req, res) => {
	res.render("addSuperhero"); // Renderiza el formulario
});

// Ruta para procesar el formulario
router.post(
	"/heroes/agregar",
	superheroValidationRules(),
	handleValidationErrors,
	agregarSuperheroeController);

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
// 	superheroValidationRules(),
// 	handleValidationErrors,
// 	agregarSueperheroeController,
// );

// Actualizar un superhéroe por su id
router.put(
	"/heroes/actualizar/:id",
	superheroValidationRules(),
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
