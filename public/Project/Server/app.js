module.exports = function(app,db,mongoose){

    var breUserModel = require("./models/user.model.js")(db, mongoose);
    //var formModel = require("./models/form.model.js")(db, mongoose);
    //var userSchema = require("./models/user.schema.js")();
    require("./services/server.user.service.js")(app, breUserModel);
    //require("./services/form.service.js")(app, formModel);
    //require("./services/field.service.js")(app, formModel);

};