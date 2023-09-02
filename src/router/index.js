const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

// POST Receipts
router.post('/receipts/process', controllers.bodyParser, controllers.submitReceipt);

// Get Receipt points
router.get('/receipts/:id/points', controllers.getReceipt);

// Handling error 404
router.use(controllers.notFound);

// Handling 4xx - 5xx
router.use(controllers.errorHandler);

module.exports = router;