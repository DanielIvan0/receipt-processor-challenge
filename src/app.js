/**
 * Initialize Express app, import and set routes and export web application
 * @namespace Application
 */
const express = require('express');

const router = require('./router');

const app = express();

app.use(router);

module.exports = app;