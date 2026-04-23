// Middleware para parsear strings (poderes, aliados, enemigos) a array
export const parseFieldsToArray = (fields) => {
    return (req, res, next) => {
        // Recorre CADA campo
        fields.forEach((field) => {
            // Verifica si el campo existe en el body y si un string
            if (req.body[field] && typeof req.body[field] === "string") {
                // Convierte el campo a array diviendolo por comas y eliminando los espacios al inicio y al final
                req.body[field] = req.body[field]
                    .split(",")
                    .map((item) => item.trim());
            }
        });
        // Continua el flujo del endpoint
        next();
    };
};