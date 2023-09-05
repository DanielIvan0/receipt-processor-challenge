const SchemaValidator = require('../../dependencies/SchemaValidator');

/**
 * Definition of Item Schema.
 * @memberof ReceiptModel
 */
const ItemSchema = {
    type: 'object',
    properties: {
        shortDescription: {
            type: 'string',
            pattern: '^[\\w\\s\\-]+$'
        },
        price: {
            type: 'string',
            pattern: '^\\d+\\.\\d{2}$'
        },
    },
    required: [ 'shortDescription', 'price' ],
    additionalProperties: false,
};

/**
 * Definition of Receipt Schema.
 * @memberof ReceiptModel
 */
const ReceiptSchema = {
    type: 'object',
    properties: {
        retailer: {
            type: 'string',
            pattern: '^\\S+$',
        },
        purchaseDate: {
            type: 'string',
            format: 'date',
        },
        purchaseTime: {
            type: 'string',
            pattern: '^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$',
        },
        items: {
            type: 'array',
            items: ItemSchema,
        },
        total: {
            type: 'string',
            pattern: '^\\d+\\.\\d{2}$'
        },
    },
    required: [ 'retailer', 'purchaseDate', 'purchaseTime', 'total', 'items' ],
    additionalProperties: false,
};

/**
 * Validates structure of incoming data with Receipt Schema definition.
 * @param {Object} receiptData
 * @returns {Boolean} true if and only if satisfies the scheme, false otherwise
 * @memberof ReceiptModel
 */
const ReceiptValidator = SchemaValidator.compile(ReceiptSchema);

module.exports = {
    Schema: ReceiptSchema,
    SchemaValidator: ReceiptValidator,
};