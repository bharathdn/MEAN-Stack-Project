var express         = require('express');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var mongoose        = require('mongoose');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

//mongoose.connect('mongodb://localhost/cs5610');
mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL ||
                  'mongodb://localhost/cs5610');

var app = express();

app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse application/x-www-form-urlencoded
app.use(multer());//parse multipart/form-data
app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


//mongoose.connect('mongodb://localhost/cs5610');
var db = mongoose.connection;
//console.log(db);

require("./public/assignment4/server/app.js")(app,db,mongoose);
require("./public/assignment5/server/app.js")(app,db,mongoose);


require("./public/Project/Server/app.js")(app,db,mongoose,passport);




var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
