module.exports = function(mongoose) {
    var breBookSchema =  mongoose.Schema({
            ISBN_13             : String,
            title               : String,
            author              : [String],
            thumbnailUrl        : String,
            description         : String,
            googlePreviewLink   : String,


            // overall breview rating for the book
            breViewRating   : {type: Number, max: 5},
            // overall breview  Sentiment rating for the book
            sentimentRating : {type: Number, max:100}
        },
        {collection: "bukreview.test.book"});

    return breBookSchema;
};

