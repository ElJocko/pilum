'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var gameRoutes = require('./gameRoutes');
var errorHandler = require('../lib/errorHandler');

var router = express.Router();

// Parse the request body
router.use('/api', bodyParser.json());
router.use('/api', bodyParser.urlencoded({ extended: true }));

// Set up the routes
router.use('/api', gameRoutes);

// Handle errors that haven't otherwise been caught
router.use(errorHandler.bodyParser);
router.use(errorHandler.catchAll);

module.exports = router;
