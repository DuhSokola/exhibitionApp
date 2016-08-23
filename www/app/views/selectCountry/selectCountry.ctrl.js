;(function () {
    'use strict';

    var dependencies = [
        'app.selectLanguage.directive',
        'app.userEntity',
        'app.leadEntity'
    ];

    var app = angular.module('app.selectCountry.ctrl', dependencies);

    app.controller('SelectCountryCtrl', ['$scope', '$rootScope', '$state', 'UserEntity', 'LeadEntity', function ($scope, $rootScope, $state, UserEntity, LeadEntity) {

        var initializeLeadData = function () {
            $scope.data = {};
            $scope.data.customer = {};
            $scope.data.customer.country = '';
            $scope.data.customer.language = '';
        };
        var initializeUiData = function () {
            $scope.ui = {};
            $scope.ui.campaign = UserEntity.getCampaign();
            $scope.ui.brand = UserEntity.getBrand();
            $scope.ui.person = UserEntity.getPerson();
        };

        initializeLeadData();
        initializeUiData();

        $rootScope.$on('resetAllViews', function () {
            console.log('reset selectCountry scope');
            reset();
        });

        $scope.selectCountry = function (value) {
            if (fieldsAreValid()) {
                if (value === 'ch') {
                    $scope.data.customer.country = 'ch';
                    LeadEntity.setCustomerCountry($scope.data.customer.country);
                    LeadEntity.setCustomerLanguage($scope.data.customer.language);
                    LeadEntity.setMode('swiss');
                    $state.go('searchCustomer');
                } else if (value === 'foreign') {
                    $scope.data.customer.country = 'nonch';
                    LeadEntity.setCustomerCountry($scope.data.customer.country);
                    LeadEntity.setCustomerLanguage($scope.data.customer.language);
                    LeadEntity.setMode('foreign');
                    $state.go('customerForm');
                }
            }else{
                alert('Bitte Sprache auswählen');
            }
        };

        var fieldsAreValid = function () {
            var isValid = true;

            if ($scope.data.customer.language == ''
                || $scope.data.customer.language == undefined) {

                isValid = false;
            }

            return isValid
        };

        var reset = function () {
            $('.item.item-radio .radio-content .radio-icon').css('visibility', 'hidden');
            initializeUiData();
            initializeLeadData();
        };

        $scope.goBack = function () {
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };


    }]);

}());