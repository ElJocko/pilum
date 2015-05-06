'use strict';

var mongoose = require('mongoose');
var gameStates = require('../enumerations/gameStates');

var GameSchema = new mongoose.Schema({
    state: { type: String, enum: Object.keys(gameStates) },
    currentTurn: Number
});

module.exports = GameSchema;