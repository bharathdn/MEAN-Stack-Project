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

        
        function findAllFormsForUser(userId){
            var deferred = $q.defer();

            $http.get("/api/assignment/user/"+userId+"/form")
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId)
                .success(function (forms){
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }

        function updateFormById(form){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/:formId",form)
                .success(function (forms) {
                    deferred.resolve(forms);
                });
            return deferred.promise;
        }
    }
})();