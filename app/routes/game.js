'use strict';

var router  = require('express').Router();
var game = require('../controllers/game');

router.route('/game')
    .post(game.createGame);

router.route('/game/:gameId')
    .get(game.retrieveGame)
    .put(game.updateGame)
    .delete(game.deleteGame);

module.exports = router;