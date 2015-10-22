'use strict';

var express  = require('express');
var gameController = require('../controllers/gameController');

var router = express.Router();

router.route('/v1/games')
    .get(gameController.list)
    .post(gameController.create);

router.route('/v1/games/:gameId')
    .get(gameController.findById)
    .delete(gameController.delete);

module.exports = router;