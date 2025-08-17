export const notFound = (req, res, _next) => {
    res.status(404).json({
        message: `Route not found: ${ req.method } ${ req.originalUrl }`
    });
};

export const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    const status = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};
