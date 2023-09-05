"use strict";

// Initializing web app
const app = require('./src/app');

const { PORT: port } = process.env;

// Start server at port described in .env file
app.listen(port, () => console.log(`Server up and running on port ${port}`));