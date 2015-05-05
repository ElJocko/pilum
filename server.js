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
        console.log('Pilum Server listening on port ' + config.port + '.');
    });
}

