const express = require('express');
const {
    getReceiptPoints,
    submitReceipt,
} = require('../controllers/receipt.controller');
const bodyParser = require('./bodyParser');

/**
 * Handle all the receipt routes
 * @memberof Application
 */
const receiptRouter = express.Router();

// POST Receipts
receiptRouter.post('/process', bodyParser, submitReceipt);

// Get Receipt points
receiptRouter.get('/:id/points', getReceiptPoints);

module.exports = receiptRouter;