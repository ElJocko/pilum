'use strict';

var mongoose = require('mongoose');
var ArmyListSchema = require('./schemas/armyList');

mongoose.model('ArmyList', ArmyListSchema);

module.exports = mongoose.model('ArmyList');
