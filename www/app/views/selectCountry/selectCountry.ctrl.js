;(function () {
    'use strict';

    var dependencies = [
        'app.selectLanguage.directive',
        'app.userEntity',
        'app.leadEntity'
    ];

    var app = angular.module('app.selectCountry.ctrl', dependencies);

    app.controller('SelectCountryCtrl', ['$scope', '$state', 'UserEntity', 'LeadEntity', function ($scope, $state, UserEntity, LeadEntity) {

        $scope.data = {} ;
        $scope.data.customer = {};
        $scope.data.customer.country = undefined;
        $scope.data.customer.language = undefined;


        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();


        $scope.selectCountry = function(value){
            if(value === 'ch'){
                $scope.data.customer.country = 'ch';
                LeadEntity.setCustomerCountry($scope.data.customer.country);
                LeadEntity.setCustomerLanguage($scope.data.customer.language);
                $state.go('searchCustomer');
            }else if(value === 'foreign'){
                $scope.data.customer.country = 'nonch';
                LeadEntity.setCustomerCountry($scope.data.customer.country);
                LeadEntity.setCustomerLanguage($scope.data.customer.language);
                $state.go('customerForm');
            }
        };

        $scope.goBack = function(){
            $state.go('selectModel');
        };

        $scope.goToHomePage = function(){
            //TODO reset all
            $scope.data.customer.country = undefined;
            $scope.data.customer.language = undefined;
            LeadEntity.resetAll();
            $state.go('login');
        };


    }]);

}());