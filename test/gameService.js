var expect = require('expect');
var gameService = require('../app/services/game');
var config = require('../app/config/config');
var mongoose = require('mongoose');

describe('Game Service', function() {
    before(function(done) {
        var db = mongoose.connect(config.dbUrl);

        mongoose.connection.on('connected', function () {
            done();
        });

        mongoose.connection.on('error', function (err) {
            done(err);
        });
    })

    var gameId = null;

    describe('create', function() {
        it('should create a new game', function(done) {
            gameService.createGame({ }, function(err, game) {
                expect(err).toBe(null);
                expect(game).toExist();
                expect(game.state).toBe('notStarted');
                expect(game.currentTurn).toBe(0);

                gameId = game.id;

                done();
            })
        })
    })

    describe('retrieve', function() {
        it('should retrieve the created game', function(done) {
            gameService.retrieveGame(gameId, function(err, game) {
                expect(err).toBe(null);
                expect(game).toExist();
                expect(game.state).toBe('notStarted');
                expect(game.currentTurn).toBe(0);

                done();
            })
        })
    })

    describe('retrieve null', function() {
        it('should not retrieve a game using a null gameId', function(done) {
            gameService.retrieveGame(null, function(err, game) {
                expect(err).toExist();
                expect(game).toNotExist();

                done();
            })
        })
    })

    describe('retrieve bad gameId', function() {
        it('should not retrieve a game using a bad gameId', function(done) {
            gameService.retrieveGame('FFFFFFFFFFFFFFFFFFFFFFFF', function(err, game) {
                expect(err).toNotExist();
                expect(game).toNotExist();

                done();
            })
        })
    })

    describe('delete', function() {
        it('should delete the created game', function(done) {
            gameService.deleteGame(gameId, function(err, game) {
                expect(err).toBe(null);
                expect(game).toExist();

                done();
            })
        })
    })

    describe('retrieve deleted game', function() {
        it('should not retrieve the deleted game', function(done) {
            gameService.retrieveGame(gameId, function(err, game) {
                expect(err).toNotExist();
                expect(game).toNotExist();

                done();
            })
        })
    })

    describe('delete null', function() {
        it('should not delete a game using a null gameId', function(done) {
            gameService.deleteGame(null, function(err, game) {
                expect(err).toExist();
                expect(game).toNotExist();

                done();
            })
        })
    })

    describe('delete bad gameId', function() {
        it('should not delete a game using a bad gameId', function(done) {
            gameService.deleteGame('FFFFFFFFFFFFFFFFFFFFFFFF', function(err, game) {
                expect(err).toExist();
                expect(game).toNotExist();

                done();
            })
        })
    })
})