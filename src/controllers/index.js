const getReceipt = require('./getReceipt');
const submitReceipt = require('./submitReceipt');
const bodyParser = require('./bodyParser');
const { notFound, errorHandler } = require('./errors');

module.exports = {
    submitReceipt,
    getReceipt,
    bodyParser,
    notFound,
    errorHandler,
};