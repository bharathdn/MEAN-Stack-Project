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
            FindFieldsForFormId: FindFieldsForFormId,
            DeleteFieldFromForm: DeleteFieldFromForm,
            AddFieldIntoForm: AddFieldIntoForm
        };
        return service;

        function AddFieldIntoForm(formId, field){
            var deferred = $q.defer();

            $http.post("/api/assignment/form/"+formId+"/field",field)
                .success(function (fields){
                    deferred.resolve(fields);
                });
            return deferred.promise;

        }

        function FindFieldsForFormId(formId){
            var deferred = $q.defer();
            //console.log("feild Service, fetching fields for:"+formId);
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(fields){
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }

        function DeleteFieldFromForm(fieldId, formId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(fields){
                   deferred.resolve(fields);
                });
            return deferred.promise;
        }
    }

})();