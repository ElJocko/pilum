'use strict';

var logger = require('../logger/logger');
var gameService = require('../services/game');

exports.retrieveGame = retrieveGame;
exports.createGame = createGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;

function retrieveGame(req, res) {
    gameService.retrieveGame(req.params.gameId, function(err, game) {
        if (err) {
            logger.error('Unable to retrieve game:', err.msg);
            res.status(500).send('error');
        }
        else {
            res.status(200).send('ok');
        }
    });
}

function createGame(req, res) {
    logger.info('createGame()');
}

function updateGame(req, res) {
    logger.info('updateGame()');
}

function deleteGame(req, res) {
    logger.info('deleteGame()');
}

