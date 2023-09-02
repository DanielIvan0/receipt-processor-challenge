/**
 * Error types handled by the web app
 * @memberof ErrorHandler
 */
const types = {
    server_error: {
        status: 500,
        description: 'Server error'
    },
    resource_not_found: {
        status: 404,
        description: 'No receipt found for that id',
    },
    endpoint_not_found: {
        status: 404,
        description: 'Endpoint not found',
    },
    schema_validation_error: {
        status: 400,
        description: 'The receipt is invalid',
    },
    json_syntax_error: {
        status: 400,
        description: 'JSON syntax error',
    },
}

/**
 * Class to handle errors into the web app
 * @class
 * @extends Error
 * @namespace ErrorHandler
 */
class ErrorHandler extends Error {
    constructor(errorTypes) {
        const error = types[errorTypes] || types.server_error;

        super(error.description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.status = error.status;
        this.description = error.description;

        Error.captureStackTrace(this);
    }
};

module.exports = ErrorHandler;