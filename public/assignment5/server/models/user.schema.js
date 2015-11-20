module.exports = function(mongoose) {

    //var mongoose = require('mongoose');
    //var Schema = mongoose.Schema;
    var userSchema =  mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String
        //seats: Number,
        //seats: {type: Number, default: 32},
        //starts: Date
        //starts: {type: Date, default: Date.now},
        },
        {collection: "cs5610.assignment.user"});

    return userSchema;
};