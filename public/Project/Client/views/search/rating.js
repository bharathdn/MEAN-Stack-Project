//angular.module('myModule', ['ui.bootstrap']);
//angular.module('RatingDemoCtrl', ['ui.bootstrap']);
angular.module('BukReviewApp')
    .controller('RatingCtrl', function ($rootScope) {


        var model = this;
        model.rate = 4;
        model.max = 5;
        model.isReadonly = true;

        /*model.hoveringOver = function(value) {
         model.overStar = value;
         model.percent = 100 * (value / model.max);
         };

         model.ratingStates = [
         {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
         ];*/
    });