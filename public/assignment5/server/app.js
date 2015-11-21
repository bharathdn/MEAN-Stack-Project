module.exports = function(app,db,mongoose){

    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);
    //var userSchema = require("./models/user.schema.js")();
    require("./services/user.service.js")(app, userModel);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);

};