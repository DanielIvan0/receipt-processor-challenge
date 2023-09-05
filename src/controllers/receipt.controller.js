const ErrorHandler = require('../dependencies/ErrorHandler');
const { Receipt } = require('../models/receipt.model');
const wrapper = require('./wrapper');

/**
 * Get Receipt Points Controller.
 * @memberof Controllers
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 * @function
 */
const getReceiptPoints = wrapper(request => {
    const { id } = request.params;

    const receipt = Receipt.findById(id);

    if (!receipt) throw new ErrorHandler('resource_not_found');
    const { points } = receipt;

    return { points };
});

/**
 * Submit Receipt Controller.
 * @memberof Controllers
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 * @function
 */
const submitReceipt = wrapper(request => {
    const { body } = request;

    const receiptId = Receipt.save(body);

    return { id: receiptId };
});

module.exports = {
    getReceiptPoints,
    submitReceipt,
};