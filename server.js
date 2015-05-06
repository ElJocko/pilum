var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var logger = require('./app/logger/logger');
var mongoose = require("mongoose");
var routes = require('./app/routes/index');

var config = require('./app/config/config');

// Bootstrap db connection
var db = mongoose.connect(config.dbUrl);
logger.info('...Mongoose attempting to connect to ' + config.dbUrl);

mongoose.connection.on('connected', function () {
    logger.info('...Mongoose connected to ' + config.dbUrl);
});

mongoose.connection.on('disconnected', function () {
    logger.info('...Mongoose disconnected from ' + config.dbUrl);
});

mongoose.connection.on('error', function (err) {
    logger.warn('...Mongoose connection error: ' + err);
    logger.warn('Database (mongoose) connection is required. Terminating app.');

    // Delay 1 second for output to finish, then terminate
    setTimeout(
        function(){
            process.exit(1);
        },
        1000);
});

app.use(morgan('dev', { stream : logger.stream }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({ extended: true }));

// Set up the routes
// Rest API
app.use(routes);

// Participant start up app
//app.get('/', function(req, res) {
//    res.redirect('/labs/index.html');
//});

//mongoose.connect(config.dbUrl);

module.exports = app;

if (!module.parent) {
    http.createServer(app).listen(config.port, function() {
        logger.info('Pilum Server listening on port ' + config.port + '.');
    });
}

