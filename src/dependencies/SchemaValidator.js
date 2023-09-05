const Ajv = require('ajv');
const addFormats = require('ajv-formats');

/**
 * Schema Validator to validate client's input.
 * @namespace SchemaValidator
 * @package
 * @generator
 */
const ajv = new Ajv();

addFormats(ajv);

module.exports = ajv;