import { body } from "express-validator";

export const superheroValidations = [
	// nombreSuperheroe
  body("nombreSuperheroe")
    .trim()
    .notEmpty().withMessage("El nombre del superhéroe es requerido.")
    .isLength({ min: 3 }).withMessage("El nombre del superhéroe debe tener al menos 3 caracteres.")
    .isLength({ max: 60 }).withMessage("El nombre del superhéroe no puede superar los 60 caracteres.")
    .not().matches(/^\d+$/).withMessage("El nombre del superhéroe no puede contener solo números."),

  // nombreReal
  body("nombreReal")
    .trim()
    .notEmpty().withMessage("El nombre real es requerido.")
    .isLength({ min: 3 }).withMessage("El nombre real debe tener al menos 3 caracteres.")
    .isLength({ max: 60 }).withMessage("El nombre real no puede superar los 60 caracteres.")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/).withMessage("El nombre real no puede contener números ni caracteres especiales."),

  // edad
  body("edad")
    .trim()
    .notEmpty().withMessage("La edad es requerida.")
    .isNumeric().withMessage("La edad debe ser un número.")
    .isNumeric({ min: 0 }).withMessage("La edad no puede ser negativa."),

  // poderes
  body("poderes")
    .isArray({ min: 1 }).withMessage("Los poderes son requeridos."),
  body("poderes.*")
    .trim()
    .notEmpty().withMessage("Los poderes no pueden quedar vacios.")
    .isLength({ min: 3 }).withMessage("Cada poder debe tener al menos 3 caracteres.")
    .isLength({ max: 60 }).withMessage("Cada poder no puede superar los 60 caracteres.")
    //.not().matches(/^\d+$/).withMessage("Ninún poder puede contener sólo números."),
];
