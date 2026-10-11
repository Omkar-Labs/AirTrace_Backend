import { ZodError } from "zod";
export function validateBody(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid request body",
                    details: error.issues.map((i) => ({
                        field: i.path.join("."),
                        message: i.message,
                    })),
                });
            }
            next(error);
        }
    };
}
export function validateQuery(schema) {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid query parameters",
                    details: error.issues.map((i) => ({
                        field: i.path.join("."),
                        message: i.message,
                    })),
                });
            }
            next(error);
        }
    };
}
