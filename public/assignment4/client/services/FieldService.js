(function() {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        //var forms = [];
        var service = {
            //createFormForUser: createFormForUser,
            //findAllFormsForUser: findAllFormsForUser,
            //deleteFormById: deleteFormById,
            //updateFormById: updateFormById,
            FindFieldsForFormId: FindFieldsForFormId
        };
        return service;

        function FindFieldsForFormId(formId){
            var deferred = $q.defer();
            //console.log("feild Service, fecting fields for:"+formId);
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(fields){
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }
    }

})();