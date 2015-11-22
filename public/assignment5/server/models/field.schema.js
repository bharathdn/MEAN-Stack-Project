module.exports = function(mongoose) {

    var fieldSchema = mongoose.Schema({

        label: String,
        type: {
            type: "String",
            enum: ["TEXT", "EMAIL", "OPTIONS","CHECKBOXES",
                "TEXTAREA", "RADIOS","DATE"]
        },
        options: [{ label: String,
                    value: String}],
        placeholder: String
    });
    return fieldSchema;
};