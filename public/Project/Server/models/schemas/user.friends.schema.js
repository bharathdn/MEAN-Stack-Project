module.exports = function(mongoose) {

    var userFriends = mongoose.Schema({
            userId      :  String,
            friends     : [String],
            followers   : [String]
            /*friends     : {type: [String], unique : true},
            followers   : {type: [String], unique : true}*/

            /*friends     : {type: [String], unique: true},
            followers   : {type: [String], unique: true}*/
        },
        {collection: "bukreview.test4.friends"});

    return userFriends;
};