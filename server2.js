var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public2'));

var courses = [
    {title: "Java 101",seats: 25,starts: new Date()},
    {title: "PHP 101", seats:244, starts: new Date(2016,1,15)},
    {title: "C#", seats:24, starts: new Date(2016,1,15)},
    {title: "SQL", seats:23, starts: new Date(2016,1,15)},
    {title: "MR 101", seats:255, starts: new Date(2015,12,5)}
];

//CRUD create,read,update and Delete

//this is read
app.get("/rest/course",function(req,res){
    res.json(courses);
});

app.get("/rest/course/:id",function(req,res){
    var index = req.params.id;
    res.json(courses[index]);
});

app.delete("/rest/course/:id",function(req,res){
    var index = req.params.id;
    courses.splice(index,1);
    //res.send(courses);
    // use the below code to respond as a JSON
    res.json(courses);
});


/* examples
app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/getSomeJson', function (req,res) {
   res.send({message:"Hello Worlds"});
});

app.get('/getJsonArray', function(req,res) {
    var array = [{title: "Java"},{Seats: 66}];
    res.send(array);
});
*/

app.listen(3000);