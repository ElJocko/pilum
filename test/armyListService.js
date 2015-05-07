var expect = require('expect');
var armyListService = require('../app/services/armyList');
var config = require('../app/config/config');
var mongoose = require('mongoose');

describe('ArmyList Service', function() {
    before(function(done) {
        if (mongoose.connection.readyState === 1) {
            done();
        }
        else {
            var db = mongoose.connect(config.dbUrl);

            mongoose.connection.on('connected', function () {
                done();
            });

            mongoose.connection.on('error', function (err) {
                done(err);
            });
        }
    })

    var armyListId = null;

    describe('create', function() {
        it('should create a new army list', function(done) {
            var armyListData = {
                name: 'Roman',
                startYear: -500,
                endYear: 483,
                troops: [
                    { kind: 'Blades', quantity: 4 }
                ]
            }
            armyListService.createArmyList(armyListData, function(err, armyList) {
                expect(err).toBe(null);
                expect(armyList).toExist();

                expect(armyList.name === armyListData.name);
                expect(armyList.startYear === armyListData.startYear);
                expect(armyList.endYear === armyListData.endYear);
                expect(armyList.troops.length === 1);

                armyListId = armyList.id;

                done();
            })
        })
    })

    describe('create validation check', function() {
        it('should not create a new army list due to bad data', function(done) {
            var armyListData = {
                name: 'Roman',
                startYear: -500,
                endYear: 483,
                troops: [
                    { kind: 'Not Blades', quantity: 4 }
                ]
            }
            armyListService.createArmyList(armyListData, function(err, armyList) {
                expect(err).toExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })

    describe('retrieve', function() {
        it('should retrieve the created army list', function(done) {
            armyListService.retrieveArmyListById(armyListId, function(err, armyList) {
                expect(err).toBe(null);
                expect(armyList).toExist();

                done();
            })
        })
    })

    describe('retrieve null', function() {
        it('should not retrieve an army list using a null armyListId', function(done) {
            armyListService.retrieveArmyListById(null, function(err, armyList) {
                expect(err).toExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })

    describe('retrieve bad armyListId', function() {
        it('should not retrieve an army list using a bad armyListId', function(done) {
            armyListService.retrieveArmyListById('FFFFFFFFFFFFFFFFFFFFFFFF', function(err, armyList) {
                expect(err).toNotExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })

    describe('delete', function() {
        it('should delete the created army list', function(done) {
            armyListService.deleteArmyListById(armyListId, function(err, armyList) {
                expect(err).toBe(null);
                expect(armyList).toExist();

                done();
            })
        })
    })

    describe('retrieve deleted army list', function() {
        it('should not retrieve the deleted army list', function(done) {
            armyListService.retrieveArmyListById(armyListId, function(err, armyList) {
                expect(err).toNotExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })

    describe('delete null', function() {
        it('should not delete an army list using a null armyListId', function(done) {
            armyListService.deleteArmyListById(null, function(err, armyList) {
                expect(err).toExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })

    describe('delete with bad armyListId', function() {
        it('should not delete an army list using a bad armyListId', function(done) {
            armyListService.deleteArmyListById('FFFFFFFFFFFFFFFFFFFFFFFF', function(err, armyList) {
                expect(err).toNotExist();
                expect(armyList).toNotExist();

                done();
            })
        })
    })
})
