import { body } from "express-validator";

export const superheroValidationRules = () => [
	// Validar nombreSuperheroe
	body("nombreSuperheroe")
		.trim() // Eliminar espacios en blanco al inicio y al final
		.custom((value) => { // Validar que el nombreSuperheroe no se solo números 
			if (!isNaN(value)) { // Si el nombreSuperheroe no es un NaN, significa que se ingresó solo números
				throw new Error("El nombre del Superhéroe no puede contener sólo números");
			}
			return true;
		}),
	// Validar nombre real del superhéroe
	body("nombreReal")
		.trim()
		.custom((value) => { // Validar que el nombreReal no contenga números
			if (/\d/.test(value)) {
				throw new Error("El nombre real del superhéroe no puede contener números");
			}
			return true;
		}),
	body("edad")
		.isNumeric()
		.withMessage("La edad deber ser un número")
		.custom((value) => { // validar que se un número mayor a 0
			if (value < 0) {
				throw new Error("La edad no puede ser negativa");
			}
			return true; // Indica que se cumplió la validación.
		})
		.trim(),
	body("poderes")
		// .isArray({ min: 1 }) // Validar que el array no esté vacío
		// .withMessage("Los poderes del Superhéroe son requeridos."),
		,
	body("poderes.*") // El asterisco aplica la regla a CADA elemento del array
		.notEmpty()
		.withMessage("Ningún poder puede quedar vacío.")
		.isLength({ min: 3, max: 60 })
		.withMessage("Cada poder debe tener entre 3 y 60 caracteres")
		.isString()
		.withMessage("Todos los poderes deben ser un texto")
		.trim(),
];
