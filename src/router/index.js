const express = require('express');
const {
    notFound,
    errorHandler,
} = require('../controllers/error.controller');
const receiptRouter = require('./receipt.route');

/**
 * Handle all the routes logic. This uses the controllers to respond the request
 * @memberof Application
 */
const router = express.Router();

router.use('/receipts', receiptRouter);

// Handling error 404
router.use(notFound);

// Handling 4xx - 5xx
router.use(errorHandler);

module.exports = router;