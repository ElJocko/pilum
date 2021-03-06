'use strict';

var gameService = require('../services/gameService');
var logger = require('../lib/logger');

exports.list = function(req, res) {
    var query = { }; // Default is all games
    if (req.query.name) {
        query.name = req.query.name;
    }
    gameService.retrieveGames(query, function(err, games) {
        if (err) {
            logger.error('Unable to retrieve list of games: ' + err);
            return res.status(500).send('Unable to get games. Server error.');
        }
        else {
            return res.status(200).send(games);
        }
    });
};

exports.findById = function(req, res) {
    gameService.retrieveGameById(req.params.gameId, function(err, game) {
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
};

exports.create = function(req, res) {
    gameService.createGame({ }, function(err, game) {
        if (err) {
            logger.error('Unable to create game:', err);
            res.status(500).send('Unable to create game.');
        }
        else {
            res.status(200).send(game);
        }
    })
};

exports.delete = function(req, res) {
    gameService.deleteGameById(req.params.gameId, function(err, game) {
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
};

