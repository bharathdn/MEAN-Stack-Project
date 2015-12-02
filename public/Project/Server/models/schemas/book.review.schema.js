module.exports = function(mongoose) {
    var breBookReviewSchema =  mongoose.Schema({
            bookId          : String,
            userId          : String,
            reviewDesc          : String,
            // breview rating for the book by userId
            breViewRating   : {type: Number, max: 5},
            // breview  Sentiment rating for the book by userId
            sentimentRating : {type: Number, max:100}
            //authType: String
        },
        {collection: "bukreview.test.bookreview"});

    return breBookReviewSchema;
};