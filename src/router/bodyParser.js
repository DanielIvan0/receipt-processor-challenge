const ErrorHandler = require('../dependencies/ErrorHandler');
const { json } = require('express');

// Parse Request body to JavaScript Object 
const bodyParser = json();

/**
 * Handle Request body parsing and ensures JSON integrity. Send json_systax_error to the client if a parsing error occurs.
 * @memberof Application
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 */
const jsonMiddleware = (req, res, next) => {
    bodyParser(req, res, err => {
        if (err) {
            const error = new ErrorHandler('json_syntax_error');

            return next(error);
        }

        next();
    });
};

module.exports = jsonMiddleware;