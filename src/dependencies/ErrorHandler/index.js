const types = require('./types');
/**
 * Class to handle errors into the web app
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
    /**
     * Gets the error from type which corresponds to the provided key, set status and description of the error and capture the stack trace.
     * The default error is server_error.
     * @constructor
     * @param {String} errorType Key of types which corresponds to the error
     */
    constructor(errorType) {
        const error = types[errorType] || types.server_error;

        super(error.description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.status = error.status;
        this.description = error.description;

        Error.captureStackTrace(this);
    }
};

module.exports = ErrorHandler;