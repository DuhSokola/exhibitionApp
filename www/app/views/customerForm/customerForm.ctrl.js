;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity',
        'app.selectItem.directive',
        'ngSanitize',
        'iso-3166-country-codes',
        'app.localStorage',
        'app.leadResource'
    ];

    var app = angular.module('app.customerForm.ctrl', dependencies);

    app.controller('CustomerFormCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', 'ISO3166', 'LocalStorageService', 'LeadResourceService', function ($scope, $state, LeadEntity, UserEntity, ISO3166, LocalStorageService, LeadResourceService) {

        $scope.data = {};
        var initData = function () {
            $scope.data.catalogTyp = ''; //validation
            $scope.data.salutation = ''; //validation
            $scope.data.firstname = LeadEntity.getCustomer().firstname; //validation
            $scope.data.lastname = LeadEntity.getCustomer().lastname; //validation
            $scope.data.firm = '';
            $scope.data.street = ''; //validation
            $scope.data.streetNr = ''; //validation
            $scope.data.zip = LeadEntity.getCustomer().zip; //validation
            $scope.data.city = LeadEntity.getCustomer().city; //validation
            $scope.data.phone = LeadEntity.getCustomer().phone.replace('*', '');//validation
            $scope.data.email = ''; //validation
            console.log(LeadEntity.getCustomer().country);
            console.log(((LeadEntity.getCustomer().country === 'ch') ? ISO3166.codeToCountry[LeadEntity.getCustomer().country.toUpperCase()] : ''));
            $scope.data.country = ((LeadEntity.getCustomer().country == 'ch') ? ISO3166.codeToCountry[LeadEntity.getCustomer().country.toUpperCase()] : ''); //validation
            $scope.data.countryCode = LeadEntity.getCustomer().country;
            $scope.data.seller = '';
            $scope.data.remarks = '';
            $scope.data.privacy = false; //validation
            $scope.data.newsletter = false;
        };
        initData();

        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();
        $scope.ui.countryList = ISO3166.codeToCountry;
        $scope.ui.mode = LeadEntity.getCustomer().mode;

        //$scope.ui.countryList = [{label:'x123', code:'x123'},{label:'1234', code:'1234'},{label:'1235', code:'1235'}];
        $scope.ui.sellerList = [{label: '123', code: '123'}, {label: '1234', code: '1234'}, {label: '1235', code: '1235'}];

        $scope.submitLead = function () {
            if (formIsValid()) {
                alert('VALID');
                LeadEntity.setBrand(UserEntity.getBrand());
                LeadEntity.setCustomerSalutation($scope.data.salutation);
                LeadEntity.setCustomerFirstname($scope.data.firstname);
                LeadEntity.setCustomerLastname($scope.data.lastname);
                LeadEntity.setCustomerFirm($scope.data.firm);
                LeadEntity.setCustomerStreet($scope.data.street);
                LeadEntity.setCustomerHouseNumber($scope.data.streetNr);
                LeadEntity.setCustomerZip($scope.data.zip);
                LeadEntity.setCustomerCity($scope.data.city);
                LeadEntity.setCustomerCountry($scope.data.countryCode);
                LeadEntity.setCustomerPhone($scope.data.phone);
                LeadEntity.setCustomerEmail($scope.data.email);
                LeadEntity.setCustomerSeller($scope.data.seller);
                LeadEntity.setCustomerRemarks($scope.data.remarks);
                LeadEntity.setCustomerNewsletter($scope.data.newsletter);
                LeadEntity.setCustomerPrivacy($scope.data.privacy);
                LeadEntity.setTypeBrochures($scope.data.catalogTyp);

                LeadResourceService.save();

                $scope.startValidation = false;
            }
        };

        $scope.$watch('data.country', function (newVal) {
            if (newVal) {
                if (newVal.length > 2) {
                    $scope.data.countryCode = ISO3166.countryToCode[newVal].toLowerCase();
                    console.log($scope.data.countryCode);
                }
            }
        });

        $scope.$watch('data', function (newVal) {
            if ($scope.startValidation === true) {
                formIsValid();
            }
        }, true);

        var formIsValid = function () {
            $scope.startValidation = true;

            var scope = $scope.data;
            var formIsValid = true;

            var printedCatalogEl = $('#radioElectronic .item-content');
            var electroCatalogEl = $('#radioPrinted .item-content');
            if (scope.catalogTyp === undefined) {
                printedCatalogEl.addClass('not-valid');
                electroCatalogEl.addClass('not-valid');
                formIsValid = false;
            } else {
                printedCatalogEl.removeClass('not-valid');
                electroCatalogEl.removeClass('not-valid');
            }

            var maleSalutationEl = $('#salutationM .item-content');
            var femaleSalutationEl = $('#salutationF .item-content');
            if (scope.salutation === undefined) {
                maleSalutationEl.addClass('not-valid');
                femaleSalutationEl.addClass('not-valid');
                formIsValid = false;
            } else {
                maleSalutationEl.removeClass('not-valid');
                femaleSalutationEl.removeClass('not-valid');
            }

            var firstnameEl = $('#firstname');
            if (scope.firstname === undefined || scope.firstname === '') {
                firstnameEl.addClass('not-valid');
                formIsValid = false;
            } else {
                firstnameEl.removeClass('not-valid');
            }

            var lastnameEl = $('#lastname');
            if (scope.lastname === undefined || scope.lastname === '') {
                lastnameEl.addClass('not-valid');
                formIsValid = false;
            } else {
                lastnameEl.removeClass('not-valid');
            }

            var streetEl = $('#street');
            if (scope.street === undefined || scope.street === '') {
                streetEl.addClass('not-valid');
                formIsValid = false;
            } else {
                streetEl.removeClass('not-valid');
            }

            var streetNrEl = $('#streetNr');
            if (scope.streetNr === undefined || scope.streetNr === '') {
                streetNrEl.addClass('not-valid');
                formIsValid = false;
            } else {
                streetNrEl.removeClass('not-valid');
            }

            var zipEl = $('#zip');
            if (scope.zip === undefined || scope.zip === '') {
                zipEl.addClass('not-valid');
                formIsValid = false;
            } else if ($scope.ui.mode === 'swiss') {
                if (scope.zip.length != 4) {
                    zipEl.addClass('not-valid');
                    formIsValid = false;
                } else {
                    zipEl.removeClass('not-valid');
                }
            } else {
                zipEl.removeClass('not-valid');
            }

            var cityEl = $('#city');
            if (scope.city === undefined || scope.city === '') {
                cityEl.addClass('not-valid');
                formIsValid = false;
            } else {
                cityEl.removeClass('not-valid');
            }

            var phoneEl = $('#phone');
            if (scope.phone === undefined || scope.phone === '') {
                phoneEl.addClass('not-valid');
                formIsValid = false;
            } else {
                phoneEl.removeClass('not-valid');
            }

            var emailEl = $('#email');
            if (scope.email === undefined || scope.email === '') {
                emailEl.addClass('not-valid');
                formIsValid = false;
            } else {
                emailEl.removeClass('not-valid');
            }

            var countryEl = $('#country');
            if (scope.countryCode === undefined || scope.countryCode === '') {
                countryEl.addClass('not-valid');
                formIsValid = false;
            } else {
                countryEl.removeClass('not-valid');
            }

            var privacyLblEl = $('#privacyLabel');
            if (scope.privacy != true) {
                privacyLblEl.css('color', 'red');
                formIsValid = false;
            } else {
                privacyLblEl.css('color', 'black');
            }

            return formIsValid;
        };

        $scope.$watch('data.catalogTyp', function (newVal) {
            var electroElem = $('.catalogTyp .radios label[id="radioElectronic"] .item-content');
            var printedElem = $('.catalogTyp .radios label[id="radioPrinted"] .item-content');
            if (newVal === 'electronic') {
                electroElem.addClass('selected');
                printedElem.removeClass('selected');
            } else if (newVal === 'printed') {
                printedElem.addClass('selected');
                electroElem.removeClass('selected');
            } else if (newVal === undefined) {
                electroElem.removeClass('selected');
                printedElem.removeClass('selected');
            }
        });

        $scope.$watch('data.salutation', function (newVal) {
            var salutationMElem = $('.salutation .radios label[id="salutationM"] .item-content');
            var salutationFElem = $('.salutation .radios label[id="salutationF"] .item-content');
            if (newVal === 'm') {
                salutationMElem.addClass('selected');
                salutationFElem.removeClass('selected');
            } else if (newVal === 'f') {
                salutationFElem.addClass('selected');
                salutationMElem.removeClass('selected');
            }
        });

        $scope.resetForm = function () {
            initData();
            $('.catalogTyp .radios label[id="radioElectronic"] .item-content').removeClass('selected');
            $('.catalogTyp .radios label[id="radioPrinted"] .item-content').removeClass('selected');
            $('.salutation .radios label[id="salutationM"] .item-content').removeClass('selected');
            $('.salutation .radios label[id="salutationF"] .item-content').removeClass('selected');
        };

        $scope.goBack = function () {
            //Reset Form
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };

    }]);

}());