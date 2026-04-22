// Middleware para parsear strings (poderes, aliados, enemigos) a array
export const parseFieldsToArray = (fields) => {
    return (req, res, next) => {
        fields.forEach((field) => {
            if (req.body[field] && typeof req.body[field] === "string") {
                req.body[field] = req.body[field]
                    .split(",")
                    .map((item) => item.trim());
            }
        });
        next();
    };
};