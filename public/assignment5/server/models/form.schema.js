module.exports = function(mongoose) {

    var fieldSchema = require("./field.schema.js")(mongoose);

    var formSchema = mongoose.Schema({

        title: String,
        userId: String,
        fields: [fieldSchema]
    }, {collection: "cs5610.assignment.form"});

    return formSchema;
};