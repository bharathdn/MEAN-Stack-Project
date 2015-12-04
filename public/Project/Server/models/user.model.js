module.exports = function(app, db, mongoose, passport){

    var q  = require("q");
    //var flow = require("finally");
    var breUserSchema               = require("./schemas/user.schema.js")(mongoose);
    var breUserModel                = mongoose.model("breUserModel",breUserSchema);

    //user Friend Schema
    var breUserFriendsSchema        = require("./schemas/user.friends.schema.js")(mongoose);
    var breUserFriendsModel         = mongoose.model("breUserFriendsModel",breUserFriendsSchema);

    //Book Details Schema
    var breBookSchema               = require("./schemas/book.schema.js")(mongoose);
    var breBookModel                = mongoose.model("breBookModel",breBookSchema);

    //Book Fav
    var breBookFavSchema            = require("./schemas/book.fav.schema.js")(mongoose);
    var breBookFavModel             = mongoose.model("breBookFavModel", breBookFavSchema);

    //Book Review
    var breBookReviewSchema         = require("./schemas/book.review.schema.js")(mongoose);
    var breBookReviewModel          = mongoose.model("breBookReviewModel", breBookReviewSchema);


    var api = {
        CreateNewUser                   : CreateNewUser,
        FindAll                         : FindAll,
        FindById                        : FindById,
        findUserByUsername              : findUserByUsername,
        Update                          : Update,
        Delete                          : Delete,
        findUserByCredentials           : findUserByCredentials,

        //userFriends Functions
        AddFriendForUserId              : AddFriendForUserId,
        findFriendsAndFollowersForId    : findFriendsAndFollowersForId,
        RemoveFriendorFollower          : RemoveFriendorFollower,

        //User Book Functions
        AddFavBookForUser               : AddFavBookForUser,
        GetFavBooksForCurrentUser       : GetFavBooksForCurrentUser
    };
    return api;


    /*
            userId      :  String,
            friends     : [String],
            followers   : [String]

    */


    // isbn for book Obj
    //book.volumeInfo. industryIdentifiers[1].identifier

    function GetFavBooksForCurrentUser(userId){
        var deferred = q.defer();
        breBookFavModel.findOne({userId: userId},
            function(err, favBookObj){
                if(err){
                    deferred.reject(err);
                }
                else{
                    if(favBookObj.bookIds.length == 0){
                        deferred.resolve(null);
                    }
                    breBookModel.find({$or: [{ISBN_13: {$in: favBookObj.bookIds}}]},
                        function(err, favBooks){
                           if(err){
                               deferred.reject(err);
                           }
                           else
                           {
                               //console.log(favBooks);
                               deferred.resolve(favBooks);
                           }
                        });
                }
            });
        return deferred.promise;
    }


    function AddFavBookForUser(userId, book){
        var deferred = q.defer();
        breBookFavModel.findOne({userId: userId},
            function(err, favBookObj){
                if(err){
                    deferred.reject(err);
                }
                else{
                    //console.log(book);
                    favBookObj.bookIds.push(book.volumeInfo.industryIdentifiers[0].identifier);
                    favBookObj.save(function(err, favBookAddedObj){
                        if(err){
                            deferred.reject(err);
                        }else{
                            // add the book to bookDetails schema
                            StoreBookDetails(book)
                            deferred.resolve(favBookAddedObj);
                        }
                    })
                }
            });
        return deferred.promise;
    }


    function StoreBookDetails(book){
        var deferred = q.defer();
        // check if book exists
        breBookModel.findOne({ISBN_13: book.volumeInfo. industryIdentifiers[1].identifier},
            function(err,result){
                if(err){
                    deferred.reject(err);
                }else{
                    if(result != null){
                        //console.log("")
                        deferred.resolve(1);
                    }else{
                        breBookModel.create({
                            ISBN_13             : book.volumeInfo. industryIdentifiers[1].identifier,
                            title               : book.volumeInfo.title,
                            authors             : book.volumeInfo.authors,
                            thumbnailUrl        : book.volumeInfo.imageLinks.smallThumbnail,
                            description         : book.volumeInfo.description,
                            googlePreviewLink   : book.volumeInfo.previewLink,
                            breViewRating       : book.volumeInfo.averageRating,
                            sentimentRating     : book.volumeInfo.averageRating * 20
                        },function(err,bookObj){
                            if(err){
                                deferred.reject(err);
                            }else{
                                deferred.resolve(1);
                            }
                        });
                    }
                }
            })
        return deferred.promise;
    }


    function RemoveFriendorFollower(userId, friendId){
        var deferred = q.defer();
        breUserFriendsModel.findOne({userId: userId},
            function( err, user){
                if(err){
                    deferred.reject(err);
                }else{
                    user.friends.splice(user.friends.indexOf(friendId),1);
                    user.save(function(err, friends){
                        if(err){
                            deferred.reject(err);
                        }else{
                            // remove userId from friend's Obj
                            breUserFriendsModel.findOne({userId: friendId},
                            function(err, friendUser){
                                if(err){
                                    deferred.reject(err);
                                }else{
                                    // remove userId from friendUser's followers
                                    friendUser.followers.splice(friendUser.followers.indexOf(userId),1);
                                    friendUser.save(function(err, result){
                                        if(err){
                                            deferred.reject(err);
                                        }else{
                                            deferred.resolve(result);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function findFriendsAndFollowersForId(userId) {
        var deferred = q.defer();

        var finalRes = {};
        breUserFriendsModel.findOne({userId: userId},
            function (err, user) {

                //console.log(user);

                //console.log(user.friends);
                //console.log(user.followers);


                breUserModel.find({$or: [ {_id : {$in: user.friends}} ]},
                    function(err, friends){
                        if(err){
                            deferred.reject(err);
                        }
                        else {
                            //deferred.resolve(users);
                            finalRes.friends = friends;
                            breUserModel.find({$or: [{_id: {$in: user.followers}}]},
                                function(err, followers){
                                    if(err){
                                        deferred.reject(err);
                                    }
                                    else{
                                        finalRes.followers = followers;
                                        deferred.resolve(finalRes);
                                    }
                                });
                        }
                });
            });
        return deferred.promise;
    }


    function AddFriendForUserId(userId, friendId){
        console.log("SERVER USER MODEL: Adding user"+friendId+" as friend to "+userId);
        //return "Hello";
        //  x adds y as friend

        var deferred = q.defer();
        // add y to x's friend list
        breUserFriendsModel.findOne({userId: userId},
            function(err,result){
                breUserFriendsModel.findOne({userId: userId},
                   function(err, userObj){
                       userObj.friends.push(friendId);
                       userObj.save(function(err,result){
                           //console.log(result);
                       });
                   });
                 breUserFriendsModel.findOne({userId: friendId},
                   function(err, userObj){
                       //console.log("user's friend has followers, updating now");
                       userObj.followers.push(userId);
                       userObj.save(function(err,result){
                           //TODO, resolve both user obj and user friend obj to verify
                           deferred.resolve(result);
                       });
                   });
        });
        return deferred.promise;
    }

    // User Friend Functions above |^|

    /*
    While creating new user,
    Also create the follwing collections
    -- UserFriends with array of Friends and Followers as empty
    -- BookFav collection with user Id and array of BookIds as empty
     */


    function CreateNewUser(user){
        //console.log("USER MODEL CREATE USER START");
        //console.log(user);
        var deferred = q.defer();
        var finalResult={};
        breUserModel.create(user, function(err, newUser){
            if(err){
                console.log(err);
                deferred.reject(err);
            } else {
                //TODO, resolve both user obj and user friend obj to verify
                console.log("USER MODEL: CREATED USER");
                console.log(newUser);
                finalResult.user = newUser;
                breUserFriendsModel.create({userId: newUser._id, friends: [], followers: []},
                function(err, friendResult){
                    if(err){
                        console.log(err);
                        deferred.reject(err);
                    }else {
                        console.log(friendResult);
                        finalResult.friend = friendResult;
                        breBookFavModel.create({userId: newUser._id, bookIds: []},
                            function(err, bookFavObj){
                               if(err){
                                   deferred.reject(err);
                               }else{
                                   //console.log(friendResult);
                                   finalResult.bookFav = bookFavObj;
                                   //console.log("USER MODEL CREATE END");
                                   deferred.resolve(finalResult);
                               }
                            });
                    }
                });
            }
        });
        return deferred.promise;
    }


    function findUserByCredentials(credentials){
        var deferred = q.defer();
        var username = credentials.username;
        var password = credentials.password;
        breUserModel.findOne({username: username, password: password},
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
        breUserModel.find(function(err,result){
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
        //console.log("brebreUserModel sent user");
        //console.log(username);
        breUserModel.findOne({username: username},
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
        //console.log("USER MODEL: findbyID called "+ id);
        breUserModel.findById(id,
            function(err,result){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


    function Delete(userId){
        var deferred = q.defer();
        breUserModel.remove({_id:userId},
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

        delete user._id;
        breUserModel.update({_id: userId}, {$set: user},
            function(err,result){
                if(err){
                    deferred.resolve(err);
                }else{
                    deferred.resolve(result);
                }
            });
        return deferred.promise;
    }


}