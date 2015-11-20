var q  = require("q");
module.exports = function(mongoose,db){

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
        if(!mongoose.Types.ObjectId.isValid(id)){
            deferred.reject(null);
        }
        console.log("USer Model : searching for user "+id);
        userModel.findById({_id: id},
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
        var userIndex = getUserIndex(userId);
        if(userIndex == null){
            return userIndex;
        }
        else {
            mockUsers.splice(userIndex,1);
            return mockUsers;
        }

    }


    function updateUser(userId, user, callback) {
        var userIndex = getUserIndex(userId);

        currentUsers[userIndex].userName = user.userName;
        currentUsers[userIndex].password = user.password;
        currentUsers[userIndex].id = userId;
        currentUsers[userIndex].userFname = user.FName;
        currentUsers[userIndex].userLname = user.LName;
        currentUsers[userIndex].userEmail = user.email;

        // callback
        callback(currentUsers[userIndex]);
    }

    var userSample = [{"id": 123, "firstName": "Alice",
        "lastName": "Wonderland",
        "username": "alice",
        "password": "alice"}];


    function Update(userId, user){
        var userIndex = getUserIndex(userId);
        if(userIndex == null){
            return userIndex;
        }
        else {
            mockUsers[userIndex].username = user.userName;
            mockUsers[userIndex].lastName = user.lastName;
            mockUsers[userIndex].firstName = user.firstName;
            mockUsers[userIndex].password = user.password;
            return mockUsers;
        }
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
