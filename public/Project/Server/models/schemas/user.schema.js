module.exports = function(mongoose) {

    //var mongoose = require('mongoose');
    //var Schema = mongoose.Schema;
    var userSchema =  mongoose.Schema({
            firstName   : String,
            lastName    : String,
            username    : String,
            password    : String,
            email       : String,
            //authType: String

        },
        {collection: "bukreview.test.userinfo"});

    return userSchema;
};