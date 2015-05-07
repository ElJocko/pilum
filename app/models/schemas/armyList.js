'use strict';

var mongoose = require('mongoose');
var troopTypes = require('../enumerations/troopTypes');

var ArmyListSchema = new mongoose.Schema({
    name: { type: String },
    startYear: Number,
    endYear: Number,
    troops: [{
        kind: { type: String, enum: troopTypes },
        quantity: Number }]
});

module.exports = ArmyListSchema;