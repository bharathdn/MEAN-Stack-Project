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

        var dbUser = {  username: user.userName,
                    password: user.password,
                    email: user.userEmail
                 };
        console.log(dbUser);
        var deferred = q.defer();
        //return  mockUsers;
        userModel.create(dbUser, function(err, result){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        console.log("added user:"+ user);
        return deferred.promise;
    };

    function FindAll(){
        return mockUsers;
    }

    //sample user json
    var userSample = [{"id": 123, "firstName": "Alice",
        "lastName": "Wonderland",
        "username": "alice",
        "password": "alice"}];


    function findUserByUsername(userName){
        for(user in mockUsers){
            if(userName == user.username){
                return user;
            }
        }
        return null;
    }


    function FindById(id){
        for(user in mockUsers) {
            if (id == user.id) {
                return user;
            }
        }
        return null;
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


    function findUserByCredentials(credentials){
        var userName = credentials.username;
        var password = credentials.password;

        for(user in mockUsers){
            if(mockUsers[user].username == userName){
                if(mockUsers[user].password == password){
                    //console.log("user "+user.username+" found");
                    return user;
                }
            }
        }
        return null;
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
