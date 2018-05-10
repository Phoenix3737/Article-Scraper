// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

// require('dotenv').config();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to DB");
});



var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// var db = require("./models");

//api routes
var apiRoutes = require("./api")

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

app.use("/api", apiRoutes)



app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
