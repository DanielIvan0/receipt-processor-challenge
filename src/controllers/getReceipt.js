const ErrorHandler = require('../dependencies/ErrorHandler');
const { Model: Receipt } = require('../models/Receipt');
const wrapper = require('./wrapper');

/**
 * Get Receipt Points Controller
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const getReceiptPoints = wrapper(request => {
    const { id } = request.params;

    const receipt = Receipt.findById(id);

    if (!receipt) throw new ErrorHandler('resource_not_found');
    const { points } = receipt;

    return { points };
});

module.exports = getReceiptPoints;