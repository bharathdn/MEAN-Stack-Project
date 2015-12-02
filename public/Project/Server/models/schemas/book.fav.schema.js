module.exports = function(mongoose) {
    var breBookFavSchema =  mongoose.Schema({
            userId          : String,
            //each bookId is the 13 digit ISBN
            bookIds          : [String]
        },
        {collection: "bukreview.test.bookfav"});

    return breBookFavSchema;
};