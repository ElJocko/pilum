'use strict';

var logger = require('../logger/logger');
var Game = require('../models/game');
var gameStates = require('../models/enumerations/gameStates');

exports.retrieveGameById = function(gameId, callback) {
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

exports.createGame = function(gameData, callback) {
    var game = new Game({ state: 'notStarted', currentTurn: '0' });
    game.save(function (err, savedGame) {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, savedGame);
        }
    });
}

exports.updateGame = function(gameData, callback) {
    logger.info('updateGame()');
    return callback(null, { });
}

exports.deleteGameById = function(gameId, callback) {
    if (gameId) {
        Game.findByIdAndRemove(gameId, function(err, game) {
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

