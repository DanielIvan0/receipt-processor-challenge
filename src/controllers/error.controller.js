const ErrorHandler = require('../dependencies/ErrorHandler');

/**
 * Unhandled Route Controller: Send 404 status to the client.
 * @memberof Controllers
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 */
const notFound = (req, res, next) => {
    const error = new ErrorHandler('endpoint_not_found');

    next(error);
};

/**
 * Error Handler Controller: Send status and description to the client depending on the error.
 * @memberof Controllers
 * @param {Error} err Error object
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 */
const errorHandler = (err, req, res, next) => {
    if (!(err instanceof ErrorHandler)) err = new ErrorHandler('server_error');

    const { status, description } = err;

    res.status(status);
    res.send(description);
};

module.exports = {
    notFound,
    errorHandler,
};