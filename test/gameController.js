var path = require('path');
var request = require('supertest');
var expect = require('expect');

var serverUrl = "http://localhost:3005";

describe('Game API', function() {
    var gameId = null;

    describe('create', function() {
        it('should create a new game',  function(done) {
            var apiPath = '/api/game';
            request(serverUrl)
                .post(apiPath)
                .send({ })
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        var game = res.body;
                        expect(game).toExist();
                        expect(game.state).toBe('notStarted');
                        expect(game.currentTurn).toBe(0);

                        gameId = game._id;

                        done();
                    }
                })
        });
    });

    describe('retrieve', function() {
        it('should retrieve the created game',  function(done) {
            var apiPath = path.join('/api/game', gameId);
            request(serverUrl)
                .get(apiPath)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        var game = res.body;
                        expect(game).toExist();
                        expect(game.state).toBe('notStarted');
                        expect(game.currentTurn).toBe(0);

                        done();
                    }
                })
        });
    });

    describe('retrieve bad gameId', function() {
        it('should not retrieve a game using a bad gameId',  function(done) {
            var apiPath = path.join('/api/game', 'FFFFFFFFFFFFFFFFFFFFFFFF');
            request(serverUrl)
                .get(apiPath)
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                })
        });
    });

    describe('delete', function() {
        it('should delete the created game',  function(done) {
            var apiPath = path.join('/api/game', gameId);
            request(serverUrl)
                .delete(apiPath)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                })
        });
    });

    describe('delete game with bad gameId', function() {
        it('should not delete a game using a bad gameId',  function(done) {
            var apiPath = path.join('/api/game', 'FFFFFFFFFFFFFFFFFFFFFFFF');
            request(serverUrl)
                .delete(apiPath)
                .expect(404)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                })
        });
    });
});

