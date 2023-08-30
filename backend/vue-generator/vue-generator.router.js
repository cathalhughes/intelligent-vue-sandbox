const express = require('express');
const router = express.Router();
const controller = require('./vue-generator.controller');

router.post('/generate-component', controller.generateComponent);

// Export the router instance
module.exports = router;
