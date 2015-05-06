'use strict';

var logger = require('../logger/logger');
var gameService = require('../services/game');

exports.retrieveGame = function(req, res) {
    gameService.retrieveGame(req.params.gameId, function(err, game) {
        if (err) {
            logger.error('Unable to retrieve game:', err);
            res.status(500).send('Unable to retrieve game.');
        }
        else if (!game) {
            logger.warn('Game not found:', err);
            res.status(404).send('Game not found.');
        }
        else {
            res.status(200).send(game);
        }
    });
}

exports.createGame = function(req, res) {
    gameService.createGame({ }, function(err, game) {
        if (err) {
            logger.error('Unable to create game:', err);
            res.status(500).send('Unable to create game.');
        }
        else {
            res.status(200).send(game);
        }
    })
}

exports.deleteGame = function(req, res) {
    gameService.deleteGame(req.params.gameId, function(err, game) {
        if (err) {
            logger.error('Unable to delete game:', err);
            res.status(500).send('Unable to delete game.');
        }
        else if (!game) {
            logger.warn('Game not found:', err);
            res.status(404).send('Game not found.');
        }
        else {
            res.status(200).send('ok');
        }
    });
}

