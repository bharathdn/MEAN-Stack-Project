angular.module('RatingDemoCtrlapp', ['ionic.rating'])

    .controller('yourCtrl', function($scope) {

        var model = this;
        // set the rate and max variables
        model.rate = 3;
        model.max = 5;

    });