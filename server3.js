var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');

var express = require('express');
var app = express();


var courseSchema = new mongoose.Schema({
    title: String,
    //seats: Number,
    seats: {type: Number, default: 32},
    //starts: Date
    starts: {type: Date, default: Date.now}
},{collection: "course"});


var Coursedb = mongoose.model("Course", courseSchema);

function findAll(callback){
        Coursedb.find(callback);
}

function findByTitle(title, callback){
    Course.find({title: title},callback);
}


//course = {title: "MongoDB", seats: 32 };

function createCourse(course){
    Coursedb.create(course,function(err, results){
            console.log(err);
            console.log(results);
        });
}



function renderCourses(err,resultSet){
    for(var result in resultSet){
        var title = resultSet[result].title;
        var seats = resultSet[result].seats;
        console.log([title,seats]);
    }
}


courses = [
    {title: "Java", seats: 25},
    {title: "C#", seats: 35},
    {title: "JS", seats: 45},
    {title: "DB", seats: 55}
];

for(var c in courses){
    createCourse(courses[c]);
}

//findAll(renderCourses);
app.get('/rest/course', function(req, res){
    findAll(function(err,results){
        res.json(results);
    })
});

app.listen(3000);