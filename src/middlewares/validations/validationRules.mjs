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
	body("poderes.*") // [*] -> Sintaxis comodín para aplicar reglas de validación a CADA alemento de un array
		
];
