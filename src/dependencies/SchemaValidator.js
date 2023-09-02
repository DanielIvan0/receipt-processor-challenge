const Ajv = require('ajv');
const addFormats = require('ajv-formats');

/**
 * Schema Validator to validate client's input
 */
const ajv = new Ajv();

addFormats(ajv);

module.exports = ajv;