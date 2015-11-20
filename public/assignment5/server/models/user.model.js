var q  = require("q");
module.exports = function(db, mongoose){

    var mockUsers = require("./user.mock.json");
    var userSchema = require("./user.schema.js")(mongoose);
    //console.log("hello from user model");
    //console.log(userSchema);
    var userModel = mongoose.model("userModel",userSchema);


    var api = {
        CreateNewUser: CreateNewUser,
        FindAll: FindAll,
        FindById: FindById,
        findUserByUsername:findUserByUsername,
        Update: Update,
        Delete: Delete,
        findUserByCredentials:findUserByCredentials,
        getUserIndex : getUserIndex
    };
    return api;


    function CreateNewUser(user){
        console.log(user);

        var deferred = q.defer();
        //return  mockUsers;
        userModel.create(user, function(err, result){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        console.log("added user:"+ user);
        return deferred.promise;
    };


    function findUserByCredentials(credentials){
        var deferred = q.defer();
        var username = credentials.username;
        var password = credentials.password;
        userModel.findOne({username: username, password: password},
        function(err,result){
           if(err){
               deferred.reject(err);
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
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    //sample user json
    var userSample = [{"id": 123, "firstName": "Alice",
        "lastName": "Wonderland",
        "username": "alice",
        "password": "alice"}];


    function findUserByUsername(username){
        var deferred = q.defer();
        userModel.findOne({username: username},
            function(err,result){
                if(err){
                    deferred.reject(err);
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
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function Update(userId, user){
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: user},
            function(err,result){
                if(err){
                    deferred.reject(null);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function getUserIndex(userId){
        var userIndex = null;
        for (var index = 0; index < mockUsers.length; index++) {
            if (mockUsers[index].id == userId) {
                userIndex = index;
                return userIndex;
            }
        }
        return userIndex;
    }
}
