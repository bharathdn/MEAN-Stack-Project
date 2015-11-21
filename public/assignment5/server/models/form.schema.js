module.exports = function(mongoose) {

    var formSchema = mongoose.Schema({

        title: String,
        userId: String,
        fields: []

    }, {collection: "cs5610.assignment.form"});

    return formSchema;
};