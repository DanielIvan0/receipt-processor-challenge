const { v4: uuid } = require('uuid');
const rules = require('./rules');
const { Schema, SchemaValidator } = require('./schema');
const ErrorHandler = require('../../dependencies/ErrorHandler');

const data = {};

/**
 * Receipt model which communicates to data storage
 * @namespace Receipt
 * @class
 */
class Model {
    /**
     * Calculates the total of points of a particular Receipt obj
     * @static
     * @method
     * @param {Object} receiptData
     * @returns {Number} points
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
     * Validates incoming data, generates an unique id for the Receipt, saves the data and returns the generated id
     * @static
     * @method
     * @param {Object} receiptData 
     * @returns {String} Generated id of the Receipt
     * @throws {ErrorHandler} Schema Validation Error
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
     * @static
     * @method
     * @param {String} id linked to Receipt
     * @returns {Object} Receipt obj or null if invalid id
     */
    static findById(id) {
        const receipt = data[id];

        return receipt || null;
    }
};

module.exports = {
    Model,
    Schema,
};