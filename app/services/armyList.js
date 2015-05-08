'use strict';

var logger = require('../logger/logger');
var ArmyList = require('../models/armyList');
var troopTypes = require('../models/enumerations/troopTypes');

exports.retrieveArmyListById = function(armyListId, callback) {
    if (armyListId) {
        ArmyList.findById(armyListId, function(err, armyList) {
            if (err) {
                return callback(err);
            }
            else {
                //Note: armyList is null if not found
                return callback(null, armyList);
            }
        });
    }
    else {
        return callback(new Error('Missing id.'));
    }
}

exports.createArmyList = function(armyListData, callback) {
    var armyList = new ArmyList(armyListData);
    armyList.save(function (err, savedArmyList) {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, savedArmyList);
        }
    });
}

exports.updateArmyList = function(armyListData, callback) {
    logger.info('updateGame()');
    return callback(null, { });
}

exports.deleteArmyListById = function(armyListId, callback) {
    if (armyListId) {
        ArmyList.findByIdAndRemove(armyListId, function(err, armyList) {
            if (err) {
                return callback(err);
            }
            else {
                //Note: armyList is null if not found
                return callback(null, armyList);
            }
        });
    }
    else {
        return callback(new Error('Missing armyListId.'));
    }
}

exports.deleteAllArmyLists = function(callback) {
    ArmyList.remove({ }, function(err) {
        if (err) {
            return callback(err);
        }
        else {
            return callback();
        }
    });
}
