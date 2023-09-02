const { Model: Receipt } = require('../models/Receipt');
const wrapper = require('./wrapper');

/**
 * Submit Receipt Controller
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
const submitReceipt = wrapper(request => {
    const { body } = request;

    const receiptId = Receipt.save(body);

    return { id: receiptId };
});

module.exports = submitReceipt;