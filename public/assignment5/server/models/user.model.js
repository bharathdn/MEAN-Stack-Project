module.exports = function(db, mongoose){

    //var mockUsers = require("./user.mock.json");
    var q  = require("q");
        var userSchema = require("./user.schema.js")(mongoose);
        var userModel = mongoose.model("userModel",userSchema);


    var api = {
        CreateNewUser: CreateNewUser,
        FindAll: FindAll,
        FindById: FindById,
        findUserByUsername:findUserByUsername,
        Update: Update,
        Delete: Delete,
        findUserByCredentials:findUserByCredentials,
    };
    return api;


    function CreateNewUser(user){
        //console.log(user);
        var deferred = q.defer();
        userModel.create(user, function(err, result){
            if(err){
                deferred.reject(null);
            } else {
                deferred.resolve(result);
                //console.log("added user:");
                //console.log(result);
            }
        });
        return deferred.promise;
    };


    function findUserByCredentials(credentials){
        var deferred = q.defer();
        var username = credentials.username;
        var password = credentials.password;
        userModel.findOne({username: username, password: password},
        function(err,result){
           if(err){
               deferred.reject(null);
           } else {
               //console.log(result);
               deferred.resolve(result);
           }
        });

        return deferred.promise;
    }


    function FindAll(){
        console.log("findall called");
        var deferred = q.defer();
        userModel.find(function(err,result){
                if(err){
                    deferred.reject(null);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function findUserByUsername(username){
        var deferred = q.defer();
        //console.log("usermodel sent user");
        //console.log(username);
        userModel.findOne({username: username},
            function(err,result){
                if(err){
                    deferred.reject(null);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function FindById(id){
        var deferred = q.defer();

        userModel.findById(id,
            function(err,result){
                if(err){
                    deferred.reject(null);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function Delete(userId){
        var deferred = q.defer();
        userModel.remove({_id:userId},
            function(err,result){
                if(err){
                    deferred.reject(null);
                } else {
                    //console.log(result);
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function Update(userId, user){
        var deferred = q.defer();
        //var dbUser = mongoose.userModel.toObject();
        //dbUser.delete("_id");
        delete user._id;
        userModel.update({_id: userId}, {$set: user},
            function(err,result){
                if(err){
                    console.log("Error: result of Update");
                    console.log(err);
                    deferred.resolve(err);
                }else{
                    console.log("Result: result of Update");
                    console.log(result);
                    deferred.resolve(result);

                }
            });
        return deferred.promise;
    }
}