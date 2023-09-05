/**
 * Error types handled by the web app. ErrorHandler uses the key of the error to get the corresponding status and description.
 * @namespace ErrorTypes
 * @type {Object}
 * @constant
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
};

module.exports = types;