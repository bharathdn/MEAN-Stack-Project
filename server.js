var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cs5610');

var app = express();
//console.log(mongoose);


app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse application/x-www-form-urlencoded
app.use(multer());//parse multipart/form-data

//mongoose.connect('mongodb://localhost/cs5610');
//var db = mongoose.connection;
//console.log(db);

app.use(express.static(__dirname + '/public'));

require("./public/assignment4/server/app.js")(app);
//require("./public/assignment5/server/app.js")(app,db,mongoose);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);