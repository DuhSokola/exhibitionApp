;(function () {
    'use strict';

    var dependencies = [
        'app.selectLanguage.directive',
        'app.userEntity',
        'app.leadEntity'
    ];

    var app = angular.module('app.selectCountry.ctrl', dependencies);

    app.controller('SelectCountryCtrl', ['$scope', '$rootScope', '$state', 'UserEntity', 'LeadEntity', '$timeout', function ($scope, $rootScope, $state, UserEntity, LeadEntity, $timeout) {

        var initializeLeadData = function () {
            $scope.data = {};
            $scope.data.customer = {};
            $scope.data.customer.country = '';
            $scope.data.customer.language = LeadEntity.getCustomer().language;
        };
        var initializeUiData = function () {
            $scope.ui = {};
            $scope.ui.campaign = UserEntity.getCampaign();
            $scope.ui.brand = UserEntity.getBrand();
            $scope.ui.person = UserEntity.getPerson();
        };

        initializeLeadData();
        initializeUiData();

        $scope.$watch('data.customer.language', function(newVal, oldVal){
            if (newVal && oldVal) {
                var element = $('#lang label[name="' + oldVal + '"] .radio-content .radio-icon');
                element.css('visibility', 'hidden');
                var element = $('#lang label[name="' + newVal + '"] .radio-content .radio-icon');
                element.css('visibility', 'visible');
            }
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
            } else {
                $('#popup_validation_error').addClass('active');
                $timeout(function () {
                    $('#popup_validation_error').removeClass('active');
                }, 1000);
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

        $scope.$watch('data.customer.language', function (newVal) {
            if (newVal != null || newVal !== '') {
                LeadEntity.setCustomerLanguage($scope.data.customer.language);
            }
        });

        $scope.goBack = function () {
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };


    }]);

}());