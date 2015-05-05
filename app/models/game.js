'use strict';

var mongoose = require('mongoose');
var GameSchema = require('./schemas/game');

mongoose.model('Game', GameSchema);

module.exports = mongoose.model('Game');
