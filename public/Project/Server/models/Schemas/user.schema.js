module.exports = function(mongoose) {

    //var mongoose = require('mongoose');
    //var Schema = mongoose.Schema;
    var userSchema =  mongoose.Schema({
            firstName       : String,
            lastName        : String,
            username        : String,
            password        : String,
            email           : String,
            joinDate        : {type : Date,  default: Date.now},
            profilePicUrl   : {type: String, default : "//placehold.it/100x100"},
            //authType: String

        },
        {collection: "bukreview.test4.userinfo"});

    return userSchema;
};