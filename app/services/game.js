'use strict';

var logger = require('../logger/logger');
var Game = require('../models/game');
var gameStates = require('../models/enumerations/gameStates');

exports.retrieveGame = function(gameId, callback) {
    if (gameId) {
        Game.findById(gameId, function(err, game) {
            if (err) {
                return callback(err);
            }
            else {
                //Note: game is null if not found
                return callback(null, game);
            }
        });
    }
    else {
        return callback(new Error('Missing gameId.'));
    }
}

exports.createGame = function(game, callback) {
    var game = new Game({ state: 'notStarted', currentTurn: '0' });
    game.save(function (err, newGame) {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, newGame);
        }
    });
}

exports.updateGame = function(game, callback) {
    logger.info('updateGame()');
    return callback(null, game);
}

exports.deleteGame = function(gameId, callback) {
    if (gameId) {
        Game.findByIdAndRemove(gameId, function(err, game) {
            if (err) {
                return callback(err);
            }
            else if (!game) {
                return callback(new Error('Could not find game', gameId));
            }
            else {
                return callback(null, game);
            }
        });
    }
    else {
        return callback(new Error('Missing gameId.'));
    }
}

