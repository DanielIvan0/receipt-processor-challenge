const { v4: uuid } = require('uuid');
const rules = require('./rules');
const { Schema, SchemaValidator } = require('./schema');
const ErrorHandler = require('../../dependencies/ErrorHandler');

const data = {};

/**
 * Receipt model which interacts to data storage and determines how the data is structured.
 * @namespace ReceiptModel
 * @class
 */
class Receipt {
    /**
     * Calculates the total of points of a particular Receipt obj.
     * @method
     * @param {Object} receiptData Receipt data to calculate points
     * @returns {Integer} Points gained
     * @memberof ReceiptModel
     */
    static calculatePoints(receiptData) {
        let points = 0;

        for (const key in rules) {
            const rule = rules[key];

            const auxPoints = rule(receiptData);
            points += auxPoints;
        }

        return points;
    }

    /**
     * Validates incoming data, generates an unique id for the Receipt, saves the data and returns the generated id.
     * @method
     * @param {Object} receiptData Receipt data from the client
     * @returns {String} Generated id of the Receipt
     * @throws {ErrorHandler} Schema Validation Error
     * @memberof ReceiptModel
     */
    static save(receiptData) {
        const isValidReceipt = SchemaValidator(receiptData);
        if (!isValidReceipt) throw new ErrorHandler('schema_validation_error');
        
        receiptData.points = this.calculatePoints(receiptData);

        const id = uuid();
        data[id] = receiptData;

        return id;
    }

    /**
     * Find and return receipt linked to provided id. Return null if no receipt found for that id.
     * @method
     * @param {String} id ID linked to Receipt
     * @returns {Object} Receipt obj or null if invalid id
     * @memberof ReceiptModel
     */
    static findById(id) {
        const receipt = data[id];

        return receipt || null;
    }
};

module.exports = {
    Receipt,
    Schema,
};