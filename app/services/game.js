'use strict';

var logger = require('../logger/logger');
var Game = require('../models/game');

exports.retrieveGame = retrieveGame;
exports.createGame = createGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;

function retrieveGame(gameId, callback) {
    logger.info('retrieving game', gameId);

    if (gameId) {
        var game = {};
        return callback(null, game);
    }
    else {
        return callback({ msg: 'Missing gameId' }, null);
    }
}

function createGame(game, callback) {
    logger.info('createGame()');
    return callback(null, game);
}

function updateGame(game, callback) {
    logger.info('updateGame()');
    return callback(null, game);
}

function deleteGame(gameId, callback) {
    logger.info('deleteGame()');
    return callback(null);
}

