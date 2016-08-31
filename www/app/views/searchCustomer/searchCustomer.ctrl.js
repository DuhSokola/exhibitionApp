;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity',
        'app.searchResource'
    ];

    var app = angular.module('app.searchCustomer.ctrl', dependencies);

    app.controller('SearchCustomerCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', 'SearchResourceService', '$timeout', '$rootScope', function ($scope, $state, LeadEntity, UserEntity, SearchResourceService, $timeout, $rootScope) {

        $scope.data = {};

        $scope.data.search = {};
        $scope.data.search.request = {};
        $scope.data.search.request.firstname = LeadEntity.getSearch().firstname;
        $scope.data.search.request.lastname = LeadEntity.getSearch().lastname;
        $scope.data.search.request.phone = LeadEntity.getSearch().phone;
        $scope.data.search.request.zip = LeadEntity.getSearch().zip;
        $scope.data.search.request.city = LeadEntity.getSearch().city;

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
            if (newVal.firstname != '' ||
                newVal.lastname != '' ||
                newVal.phone != '' ||
                newVal.zip != '' ||
                newVal.city != '') {

                $scope.data.search.result = [];
                $scope.ui.showBtnToManually = false;

                LeadEntity.setSearchFirstname($scope.data.search.request.firstname);
                LeadEntity.setSearchLastname($scope.data.search.request.lastname);
                LeadEntity.setSearchPhone($scope.data.search.request.phone);
                LeadEntity.setSearchZip($scope.data.search.request.zip);
                LeadEntity.setSearchCity($scope.data.search.request.city);

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

            if (lengthSum < 2) {
                isValid = false;
            }

            /*if (scope.zip === undefined || scope.zip === '' || scope.zip.length < 2) {
                isValid = false;
            }*/

            if (!isValid) {
                $scope.ui.startSearch = undefined;
            }

            return isValid;
        };

        $rootScope.$on('searchDone', function () {
            $scope.ui.startSearch = false;
        });

        $scope.searchCustomer = function () {
            $scope.ui.startSearch = true;
            SearchResourceService.search($scope.data.search, 'result', $scope.data.search.request.firstname, $scope.data.search.request.lastname, $scope.data.search.request.zip, $scope.data.search.request.city, $scope.data.search.request.phone)
        };

        $scope.selectCustomer = function ($event, item) {
            LeadEntity.setCustomerCountry('ch');
            LeadEntity.setCustomerSalutation(item.salutation == '1' ? 'm' : 'f');
            LeadEntity.setCustomerFirstname(item.name);
            LeadEntity.setCustomerLastname(item.surname);
            LeadEntity.setCustomerStreet(item.address);
            LeadEntity.setCustomerHouseNumber(item.houseNumber);
            LeadEntity.setCustomerCity(item.city);
            LeadEntity.setCustomerZip(item.zip);
            LeadEntity.setCustomerPhone(item.phone);
            LeadEntity.setMode('swiss');

            LeadEntity.setCustomerEmail('');
            LeadEntity.setCustomerDealer('');
            LeadEntity.setBrochureType('');
            LeadEntity.setCustomerFirm('');
            LeadEntity.setCustomerRemarks('');
            LeadEntity.setCustomerPrivacy('');
            LeadEntity.setCustomerNewsletter('');

            $state.go('customerForm');
        };

        $scope.goBack = function () {
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };

        $scope.goToForeignForm = function () {
            LeadEntity.setCustomerCountry('nonch');
            LeadEntity.setCustomerSalutation('');
            LeadEntity.setCustomerFirstname('');
            LeadEntity.setCustomerLastname('');
            LeadEntity.setCustomerStreet('');
            LeadEntity.setCustomerHouseNumber('');
            LeadEntity.setCustomerCity('');
            LeadEntity.setCustomerZip('');
            LeadEntity.setCustomerPhone('');
            LeadEntity.setMode('foreign');
            LeadEntity.setCustomerEmail('');
            LeadEntity.setCustomerDealer('');
            LeadEntity.setBrochureType('');
            LeadEntity.setCustomerFirm('');
            LeadEntity.setCustomerRemarks('');
            LeadEntity.setCustomerPrivacy('');
            LeadEntity.setCustomerNewsletter('');
            $state.go('customerForm');
        };

        $scope.goManuallyForm = function () {
            LeadEntity.setCustomerCountry('ch');
            LeadEntity.setCustomerSalutation('');
            LeadEntity.setCustomerFirstname($scope.data.search.request.firstname);
            LeadEntity.setCustomerLastname($scope.data.search.request.lastname);
            LeadEntity.setCustomerStreet('');
            LeadEntity.setCustomerHouseNumber('');
            LeadEntity.setCustomerCity($scope.data.search.request.city);
            LeadEntity.setCustomerZip($scope.data.search.request.zip);
            LeadEntity.setCustomerPhone($scope.data.search.request.phone);
            LeadEntity.setMode('swiss');
            LeadEntity.setCustomerEmail('');
            LeadEntity.setCustomerDealer('');
            LeadEntity.setBrochureType('');
            LeadEntity.setCustomerFirm('');
            LeadEntity.setCustomerRemarks('');
            LeadEntity.setCustomerPrivacy('');
            LeadEntity.setCustomerNewsletter('');
            $state.go('customerForm');
        };

        $("#zip").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

    }]);

}());