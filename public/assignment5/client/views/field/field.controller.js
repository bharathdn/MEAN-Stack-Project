(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $rootScope, FieldService) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        //console.log("Route:");
        //console.log($routeParams);

        model.removeField = removeField;
        model.addField = addField;
        //fetch the fields for the user
        if($rootScope.user != null) {
            GetFieldsForFormId(formId);
        }

        function addField(fieldType) {
            //console.log("add field called with field type "+fieldType)
            var field = {};
            switch(fieldType)
            {
                case "singlelinetext":
                    field = {
                        "label": "New Text Field",
                        "type": "TEXT",
                        "placeholder": "New Field"};
                    break;

                case "paragraphtext":
                    field = {
                        "label": "New Text Field",
                        "type": "TEXTAREA",
                        "placeholder": "New Field"};
                    break;

                case "date":
                    field = {
                        "label": "New Date Field",
                        "type": "DATE"};
                    break;

                case "dropdown":
                    field= {
                        "label": "New Dropdown",
                        "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}]
                    };
                    break;

                case "checkboxes":
                    field = {
                        "label": "New Checkboxes",
                        "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;

                case "radiobuttons":
                    field = {
                        "label": "New Radio Buttons",
                        "type": "RADIOS",
                        "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;

                default:
                    console.log("Err!! cant find field: "+fieldType);
            }

            //console.log(field);

            FieldService
                .AddFieldIntoForm(formId,field)
                .then(function(fields){
                    model.fields = fields;
                    GetFieldsForFormId();
                });
        }

        function GetFieldsForFormId(){
            FieldService
                .FindFieldsForFormId(formId)
                .then(function(fields){
                    console.log(fields);
                    model.fields = fields;
                });
        }


        function removeField(field){
            FieldService
                .DeleteFieldFromForm(field.id,formId)
                .then(function(fields){
                   console.log(fields);
                   //GetFieldsForFormId;
                    model.fields = fields;
                });
        }

    }
})();