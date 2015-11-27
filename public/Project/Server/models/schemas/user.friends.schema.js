module.exports = function(mongoose) {

    var userFriends = mongoose.Schema({
            userId      :  String,
            friends     : [String],
            followers   : [String]
        },
        {collection: "bukreview.test.friends"});

    return userFriends;
};