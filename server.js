var express = require('express');
var app = express();

app.use(bodyParser.json()); //parse application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse application/x-www-form-urlencoded
app.use(multer());//parse multipart/form-data

app.use(express.static(__dirname + '/public'));

require("./public/assignment4/server/app.js")(app);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);