(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http,$q){

        //var forms = [];
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();

            //form.id = createGuid();
            form.userId = userId;
            $http.post("/api/assignment/user/"+userId+"/form", form)
                .success(function (forms) {
                   deferred.resolve(forms)
                });

            return deferred.promise;
        }

        app.get("/api/assignment/user/:userId/form", GetFormsByUserId);
        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            
        }

        function deleteFormById(formId, callback){
            for (formIndex in forms){
                if(forms[formIndex].id == formId){
                    forms.splice(formIndex,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for (formIndex in forms){
                if(forms[formIndex].id == formId){
                    forms[formIndex].userId = newForm.userId;
                    forms[formIndex].name = newForm.name;
                    break;
                }
            }
            callback(forms[formIndex]);
        }


    }
})();
