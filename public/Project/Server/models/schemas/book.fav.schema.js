module.exports = function(mongoose) {
    var breBookFavSchema =  mongoose.Schema({
            userId          : String,
            //each bookId is the 13  or 10 digit ISBN
            bookIds          : [String]
            //bookIds          : {type: [String], unique : true}
        },
        {collection: "bukreview.test4.bookfav"});

    return breBookFavSchema;
};