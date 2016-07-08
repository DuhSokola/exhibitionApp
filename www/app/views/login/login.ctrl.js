;(function(){
    'use strict';

    var dependencies = [
        'app.selectBrand.directive',
        'app.selectLanguage.directive'
    ];

    var app = angular.module('app.login.ctrl',dependencies);

    app.controller('LoginCtrl', ['$scope',function($scope){
        $scope.user = {};
        $scope.user.brand = undefined;
        $scope.user.language = undefined;
        
    }]);

}());