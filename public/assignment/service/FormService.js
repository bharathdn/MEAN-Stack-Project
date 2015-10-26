(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService(){

        var forms = [];
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form, callback) {

            form.id = createGuid();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            userForms = [];

            for (formIndex in forms){
                if(forms[formIndex].userId == userId){
                    userForms.push(forms[formIndex]);
                }
            }
            callback(userForms);
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

        function createGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();
