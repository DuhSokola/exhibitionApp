;(function(){
    'use strict';

    var dependencies = [
        'app.selectBrand.directive'
    ];

    var app = angular.module('app.login.ctrl',dependencies);

    app.controller('LoginCtrl', ['$scope',function($scope){
        $scope.user = {};
        $scope.user.brand = 'BRAND_VW';
        
    }]);

}());