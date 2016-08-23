;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity',
        'app.searchResource'
    ];

    var app = angular.module('app.searchCustomer.ctrl', dependencies);

    app.controller('SearchCustomerCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', 'SearchResourceService', '$timeout', function ($scope, $state, LeadEntity, UserEntity, SearchResourceService, $timeout) {

        $scope.data = {};

        $scope.data.search = {};
        $scope.data.search.request = {};
        $scope.data.search.request.firstname = '';
        $scope.data.search.request.lastname = '';
        $scope.data.search.request.phone = '';
        $scope.data.search.request.zip = '';
        $scope.data.search.request.city = '';

        $scope.data.search.result = [];

        $scope.data.customer = {};
        $scope.data.customer.firstname = '';
        $scope.data.customer.lastname = '';
        $scope.data.customer.street = '';
        $scope.data.customer.zip = '';
        $scope.data.customer.city = '';

        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();
        $scope.ui.showBtnToManually = false;

        $scope.$watch('data.search.request', function (newVal) {
            console.log(newVal);
            if (newVal.firstname != '' ||
                newVal.lastname != '' ||
                newVal.phone != '' ||
                newVal.zip != '' ||
                newVal.city != '') {

                $scope.data.search.result = [];
                $scope.ui.showBtnToManually = false;

                if (fieldsAreValid()) {
                    $scope.searchCustomer();
                    $scope.ui.showBtnToManually = true;
                }
            }
        }, true);

        var fieldsAreValid = function () {
            var isValid = true;

            var scope = $scope.data.search.request;

            var lengthSum = scope.firstname.length + scope.lastname.length;

            if (lengthSum < 5) {
                isValid = false;
            }

            if (scope.zip === undefined || scope.zip === '') {
                isValid = false;
            }

            return isValid;
        };

        $scope.searchCustomer = function () {
            SearchResourceService.search($scope.data.search, 'result', $scope.data.search.request.firstname, $scope.data.search.request.lastname, $scope.data.search.request.zip, $scope.data.search.request.city, $scope.data.search.request.phone)
        };

        $scope.selectCustomer = function ($event, item) {
            LeadEntity.setCustomerSalutation(item.salutation == '1' ? 'm' : 'f');
            LeadEntity.setCustomerFirstname(item.name);
            LeadEntity.setCustomerLastname(item.surname);
            LeadEntity.setCustomerStreet(item.address);
            LeadEntity.setCustomerHouseNumber(item.houseNumber);
            LeadEntity.setCustomerCity(item.city);
            LeadEntity.setCustomerZip(item.zip);
            LeadEntity.setCustomerPhone(item.phone);

            console.log(item);

            $state.go('customerForm');
        };

        $scope.goBack = function () {
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            LeadEntity.resetAll();
            $state.go('login');
        };

        $scope.goToForeignForm = function () {
            LeadEntity.setCustomerCountry('nonch');
            $state.go('customerForm');
        };

        $scope.goManuallyForm = function () {
            LeadEntity.setCustomerSalutation('');
            LeadEntity.setCustomerFirstname('');
            LeadEntity.setCustomerLastname('');
            LeadEntity.setCustomerStreet('');
            LeadEntity.setCustomerHouseNumber('');
            LeadEntity.setCustomerCity('');
            LeadEntity.setCustomerZip('');
            LeadEntity.setCustomerPhone('');
            $state.go('customerForm');
        };

    }]);

}());