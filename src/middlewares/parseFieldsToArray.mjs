// Middleware para parsear strings (poderes, aliados, enemigos) a array
export const parseFieldsToArray = (fields) => {
    return (req, res, next) => {
        // Recorre CADA campo
        fields.forEach((field) => {
            // Verifica si el campo existe en el body
            if (req.body[field]) {
                // Si ya es un array, no hacer nada
                if (Array.isArray(req.body[field])) {
                    return;
                }

                // Si es un string que parece JSON array, parsearlo
                if (typeof req.body[field] === "string") {
                    try {
                        // Intentar parsear como JSON primero
                        const parsed = JSON.parse(req.body[field]);
                        if (Array.isArray(parsed)) {
                            req.body[field] = parsed;
                            return;
                        }
                    } catch (e) {
                        // No es JSON válido, continuar con el parsing de comas
                    }

                    // Si no es JSON, convertir el campo a array dividiéndolo por comas
                    req.body[field] = req.body[field]
                        .split(",")
                        .map((item) => item.trim())
                        .filter(item => item); // Filtrar elementos vacíos
                }
            }
        });
        // Continua el flujo del endpoint
        next();
    };
};