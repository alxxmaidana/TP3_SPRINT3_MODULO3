import Superhero from "../models/superhero.mjs";

import {
	actualizarSuperheroePorId,
	agregarNuevoSuperheroe,
	buscarSuperheoresPorAtributo,
	eliminarSuperheroePorId,
	eliminarSuperheroePorNombre,
	obtenerSuperheroePorId,
	obtenerSuperheroesMayoresDe30,
	obtenerTodosLosSuperheroes,
} from "../services/superheroService.mjs";

import {
	renderizarlistaSuperheroes,
	renderizarSuperheroe,
} from "../views/responseView.mjs";

// OBTENER SUPERHÉROE POR ID
export async function obtenerSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroe = await obtenerSuperheroePorId(id);
		if (superheroe === null) {
			return res.status(404).send({ mesagge: "Superhéroe no encontrado" });
		}
		const superheroeFormateado = renderizarSuperheroe(superheroe);
		res.status(200).json(superheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar el superhéroe",
			err: err.mesagge,
		});
	}
}

// OBTENER TODOS LOS SUPERHÉROES
export async function obtenerTodosLosSuperheroesController(_req, res) {
	try {
		const superheroes = await obtenerTodosLosSuperheroes();
		if (superheroes === null) {
			return res.status(404).send({
				message: "No hay superhéroes, la colección se encuentra vacía"
			})
		}
		// Pasamos el array de superhéroes para que la vista los renderize
		res.render("dashboard", { superheroes });

	} catch (err) {
		res.status(500).send({
			mesagge: "Error al obtener todos los superhéroes",
			err: err.mesagge,
		});
	}
}

// BUSCAR SUPERHÉROE POR ATRIBUTO Y VALOR
export async function buscarSuperheoresPorAtributoController(req, res) {
	try {
		const { atributo, valor } = req.params;
		const superheroes = await buscarSuperheoresPorAtributo(atributo, valor);
		if (superheroes.length === 0) {
			return res.status(404).send({
				mesagge: "No se encontraros superhéroes con los valores especificados",
			});
		}
		const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
		res.status(200).json(superheroesFormateados);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar sueperhéroes por atributo",
			err: err.mesagge,
		});
	}
}

// OBTENER SUEPERHÉROES MAYORES DE 30
export async function obtenerSuperheroesMayoresDe30Controller(_req, res) {
	try {
		const superheroes = await obtenerSuperheroesMayoresDe30();
		if (superheroes.length === 0) {
			return res.status(404).send({
				mesagge: "No se encontraron superhéroes mayores a 30 años",
			});
		}
		const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
		res.status(200).json(superheroesFormateados);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar superhéros mayores a 30 años",
			err: err.mesagge,
		});
	}
}

// AGREGAR NUEVO SUPERHÉROE
export async function agregarSuperheroeController(req, res) {
	try {
		// Obtener los datos del formuario del cuerpo de la petición
		const { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador } = req.body;
		// Crear un nuevo superhéroe a partir del modelo Superhero
		const nuevoSuperheroe = new Superhero({
			nombreSuperheroe,
			nombreReal,
			edad,
			planetaOrigen,
			debilidad,
			creador,
			poderes: poderes ? poderes.split(",").map((p) => p.trim()) : [],
			aliados: aliados ? aliados.split(",").map((a) => a.trim()) : [],
			enemigos: enemigos ? enemigos.split(",").map((e) => e.trim()) : [],
		});
		
		// Agregar el nuevo superhéroe
		await agregarNuevoSuperheroe(nuevoSuperheroe);
		// Redireccionar al dashboard
		res.redirect("/api/heroes");
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al agregar el nuevo superheroe",
			err: err.mesagge,
		});
	}
}

// ALIMINAR SUPERHÉROE POR NOMBRE
export async function eliminarSuperheroePorNombreController(req, res) {
	try {
		const { nombreSuperheroe } = req.params;
		const superheroeEliminado =
			await eliminarSuperheroePorNombre(nombreSuperheroe);
		if (!superheroeEliminado) {
			return res.status(404).send({
				mesagge: `El superhéroe ${nombreSuperheroe} no existe, no se puede eliminar`,
			});
		}
		const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
		res.status(200).json(superheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al eliminar el superheroe",
			err: err.mesagge,
		});
	}
}

// ELIMINAR SUPERHÉROE POR ID
export async function eliminarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroeEliminado = await eliminarSuperheroePorId(id);
		if (!superheroeEliminado) {
			return res.status(404).send({
				mesagge: "El superhéroe no existe, no se puede eliminar",
			});
		}
		const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
		res.status(200).json(superheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al elminar el superhéroe",
			err: err.mesagge,
		});
	}
}

// ACTUALIZAR SUPERHÉROE POR ID
export async function actualizarSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroeEncotrado = await actualizarSuperheroePorId(id, req.body);
		// Verificar si se encontró el superheroe
		if (superheroeEncotrado === null) {
			return res.status(404).send({
				mesagge: "No se encontró el superhéroe, no se pudo actualizar",
			});
		}
		const superheroeFormateado = renderizarSuperheroe(superheroeEncotrado);
		res.status(200).json(superheroeFormateado);
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al actualizar el superhéroe",
			err: err.mesagge,
		});
	}
}
