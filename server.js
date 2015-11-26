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
//console.log(mongoose);


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



//require("./public/assignment4/server/app.js")(app);
require("./public/assignment5/server/app.js")(app,db,mongoose);
require("./public/assignment4/server/app.js")(app,db,mongoose);


require("./public/Project/Server/app.js")(app,db,mongoose);


/*

    //var mongoose = require('mongoose');
    //var Schema = mongoose.Schema;
    var userSchema =  mongoose.Schema({
            firstName:  String,
            lastName:   String,
            username:   String,
            password:   String,
            email:      String
            //authType: String
            //seats: Number,
            //seats: {type: Number, default: 32},
            //starts: Date
            //starts: {type: Date, default: Date.now},
        },
        {collection: "bukreview.test.userinfo"});

    var userModel = mongoose.model('UserModel',userSchema);


    passport.use(new LocalStrategy(
        function(username, password, done)
        {
            userModel.findOne({username: username, password: password},
                function (err,resulr) {
                    if(err)
                    {return done(err);}
                    if(!user)
                    {return done(null,false);}
                    return done(null,user);
                })     
        }
    ));

    passport.serializeUser(function(user,done){
        done(null, user);
    });

    passport.deserializeUser(function(user,done){
        userModel.findById(user._id,
            function(err,result){
               done(err, user);
            });
    });

    app.post("/login", passport.authenticate('local'),
        function (req,res){
            var user = req.user;
            res.json(user);
        });

    app.get('loggedin',function(req,res){
       res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/logout', function(req,res){
        req.logOut();
        res.send(200);
    });

    app.post('/register', function (req,res){
        var newUser = req.body;
        userModel.findOne({username: newUser.username},
            function (err,user){
                if(err){ return next(err);}
                if(user){
                    res.json(null);
                    return;
                }
                var newUser = new userModel(req.body);
                newUser.save(function(err,user){
                    req.login(user, function(err)
                    {
                        if(err) {return next(err);}
                        res.json(user);
                    });
                });
            });
    });

    var auth = function (req, res, next) {
        if(!req.isAuthenticated())
        {
            res.send(401);
        }else{
            next();
        }
    }

    app.get("/rest/user", auth, function (req, res) {
        userModel.find(function(err,users){
            res.json(users);
        });
    });

    app.delete("/rest/user/:id", auth, function (req, res) {
        userModel.findById(req.params.id, function(err, user){
            user.remove(function(err,count){
                userModel.find(function (err,users) {
                    res.json(users);
                });
            });
        });
    });

    app.put("rest/user/:id", auth, function (req,res){
        userModel.findById(req.params.id, function(err, user){
            var newUser = req.body;
            user.update.find(function(err,users){
                res.json(users);
            });
        });
    });

    app.post("/res/user", auth, function (req,res)
    {
        userModel.findOne({username: req.body.username}, function (err, user)
        {
            if(user == null)
            {
                user = new userModel(req.body);
                user.save(function (err, user) {
                    userModel.find(function (err, users) {
                        res.json(users);
                    });
                });
            }
            else{
                userModel.find(function(err, users)
                {
                    res.json(users);
                });
            }
        });
    });


  */

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);