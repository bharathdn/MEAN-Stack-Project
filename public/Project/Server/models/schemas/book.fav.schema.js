module.exports = function(mongoose) {
    var breBookFavSchema =  mongoose.Schema({
            userId          : String,
            bookIds          : [String]
        },
        {collection: "bukreview.test.bookfav"});

    return breBookFavSchema;
};