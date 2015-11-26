//angular.module('myModule', ['ui.bootstrap']);
//angular.module('RatingDemoCtrl', ['ui.bootstrap']);
angular.module('RatingDemoCtrlapp',['ui.bootstrap'])
    .controller('RatingDemoCtrl', function ($rootScope) {


        var model = this;
        model.rate = 3;
        model.max = 10;
        model.isReadonly = true;

        /*model.hoveringOver = function(value) {
         model.overStar = value;
         model.percent = 100 * (value / model.max);
         };

         model.ratingStates = [
         {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
         ];*/
    });