'use strict';

var game = require('./game');
var router  = require('express').Router();

router.use('/api', game);

module.exports = router;