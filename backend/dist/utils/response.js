export function sendSuccess(res, data, message, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        ...(message ? { message } : {}),
        data,
    });
}
export function sendError(res, message, statusCode = 400, details) {
    return res.status(statusCode).json({
        success: false,
        error: message,
        ...(details ? { details } : {}),
    });
}
