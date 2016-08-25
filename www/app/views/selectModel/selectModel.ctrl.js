;(function () {
    'use strict';

    var dependencies = [
        'carResource',
        'accessoryResource',
        'carData',
        'accessoryData',
        'app.userEntity',
        'app.leadEntity'

    ];

    var app = angular.module('app.selectModel.ctrl', dependencies);

    app.controller('SelectModelCtrl', ['$scope', '$rootScope', '$state', 'UserEntity', 'LeadEntity', 'CarDataService', 'AccessoryDataService', '$timeout', '$stateParams', '$translate', function ($scope, $rootScope, $state, UserEntity, LeadEntity, CarDataService, AccessoryDataService, $timeout, $stateParams, $translate) {
        $scope.ui = {};
        $scope.data = {};

        var initializeUiData = function () {
            $scope.ui.mode = $stateParams.mode;

            $scope.ui.carList = CarDataService.getCarData();
            $scope.ui.accessoryList = AccessoryDataService.getAccessoryData();
            $scope.ui.campaign = UserEntity.getCampaign();
            $scope.ui.brand = UserEntity.getBrand();
            if (!$scope.ui.brand || $scope.ui.brand == '') {
                $scope.ui.brand = 'audi';
            }
            $scope.ui.person = UserEntity.getPerson();
            $scope.ui.language = $translate.proposedLanguage() !== undefined ? $translate.proposedLanguage() : $translate.use();
        };
        var initializeLeadData = function () {
            $scope.data.lead = {
                testdrive: LeadEntity.getLeadType().testdrive,
                brochure: LeadEntity.getLeadType().brochure,
                offer: LeadEntity.getLeadType().offer,
                cars: LeadEntity.getOrder().cars,
                accessories: LeadEntity.getOrder().accessories
            }
        };
        var initStyles = function () {
            var selectedCarList = $scope.data.lead.cars;
            var selectedAccessoryList = $scope.data.lead.accessories;

            $timeout(function () {

                if ($scope.data.lead.testdrive == true) {
                    $('#testdrive-btn').addClass('selected');
                    $('#testdrive-btn').find('icon').removeClass('hidden');
                }
                if ($scope.data.lead.brochure == true) {
                    $('#catalog-btn').addClass('selected');
                    $('#catalog-btn').find('icon').removeClass('hidden');
                }
                if ($scope.data.lead.offer == true) {
                    $('#offer-btn').addClass('selected');
                    $('#offer-btn').find('icon').removeClass('hidden');
                }

                for (var i = 0; i < selectedCarList.length; i++) {

                    var element = $('#car' + selectedCarList[i].code);

                    if (element.hasClass('selected')) {
                        element.removeClass('selected');
                        element.find('icon').addClass('hidden');
                    } else {
                        element.addClass('selected');
                        element.find('icon').removeClass('hidden');
                    }
                }

                for (var i = 0; i < selectedAccessoryList.length; i++) {

                    var element = $('#accessory' + selectedAccessoryList[i].code);

                    if (element.hasClass('selected')) {
                        element.removeClass('selected');
                        element.find('icon').addClass('hidden');
                    } else {
                        element.addClass('selected');
                        element.find('icon').removeClass('hidden');
                    }
                }
            }, 100);
        };

        initializeUiData();
        initializeLeadData();
        initStyles();

        $scope.selectOrderOption = function ($event, option) {

            //Toggle Value
            if (option === 'testdrive') {
                $scope.data.lead.testdrive = !$scope.data.lead.testdrive;
                if ($scope.data.lead.testdrive == false && $scope.data.lead.brochure == false) {
                    var carList = $('[id^="car"]');
                    carList.removeClass('selected');
                    carList.find('icon').addClass('hidden');
                    $scope.data.lead.cars = [];
                }
            }
            else if (option === 'catalog') {
                $scope.data.lead.brochure = !$scope.data.lead.brochure;
                if ($scope.data.lead.brochure == false) {
                    var accessoryList = $('[id^="accessory"]');
                    accessoryList.removeClass('selected');
                    accessoryList.find('icon').addClass('hidden');
                    $scope.data.lead.accessories = [];

                    if($scope.data.lead.testdrive == false){
                        var carList = $('[id^="car"]');
                        carList.removeClass('selected');
                        carList.find('icon').addClass('hidden');
                        $scope.data.lead.cars = [];
                    }

                }
            }
            else if (option === 'offer') {
                $scope.data.lead.offer = !$scope.data.lead.offer;
                if ($scope.data.lead.offer == false && $scope.data.lead.brochure == false) {
                    var carList = $('[id^="car"]');
                    carList.removeClass('selected');
                    carList.find('icon').addClass('hidden');
                    $scope.data.lead.cars = [];
                }
            }

            var element = $($event.target);

            //Toggle Style
            if (element.hasClass('selected')) {
                element.removeClass('selected');
                element.find('icon').addClass('hidden');
            } else {
                element.addClass('selected');
                element.find('icon').removeClass('hidden');
            }
        };

        $scope.toggleSelectCar = function ($event, item) {
            if ($scope.data.lead.testdrive || $scope.data.lead.brochure || $scope.data.lead.offer) {
                var element = $($event.currentTarget);

                if (element.hasClass('selected')) {
                    element.removeClass('selected');
                    element.find('icon').addClass('hidden');
                    $scope.data.lead.cars.indexOf(item);
                    $scope.data.lead.cars.splice($scope.data.lead.cars.indexOf(item), 1);
                } else {
                    element.addClass('selected');
                    element.find('icon').removeClass('hidden');
                    $scope.data.lead.cars.push(item);
                }
            } else{
                $('#popup_leadtyp_not_selected').addClass('active');
                $timeout(function () {
                    $('#popup_leadtyp_not_selected').removeClass('active');
                }, 1000);
            }
        };

        $scope.toggleSelectAccessory = function ($event, item) {
            if ($scope.data.lead.brochure == true) {
                var element = $($event.currentTarget);

                if (element.hasClass('selected')) {
                    element.removeClass('selected');
                    element.find('icon').addClass('hidden');
                    $scope.data.lead.accessories.splice($scope.data.lead.accessories.indexOf(item), 1);
                } else {
                    element.addClass('selected');
                    element.find('icon').removeClass('hidden');
                    $scope.data.lead.accessories.push(item);
                }
            } else{
                $('#popup_catalog_not_selected').addClass('active');
                $timeout(function () {
                    $('#popup_catalog_not_selected').removeClass('active');
                }, 1000);
            }
        };

        $scope.reset = function () {
            $scope.data.lead = {
                testdrive: false,
                brochure: false,
                offer: false,
                cars: [],
                accessories: []
            };
            $('.selectLeadType').find('button').removeClass('selected');
            $('.selectLeadType').find('icon').addClass('hidden');
            $('.tableRow').removeClass('selected');
            $('.tableRow').find('icon').addClass('hidden');
        };

        $scope.goToCountrySelect = function () {
            if (validateFields()) {
                LeadEntity.setTypeTestDrive($scope.data.lead.testdrive);
                LeadEntity.setTypeBrochures($scope.data.lead.brochure);
                LeadEntity.setTypeOffer($scope.data.lead.offer);

                LeadEntity.setOrderCars($scope.data.lead.cars);
                LeadEntity.setOrderAccessories($scope.data.lead.accessories);

                $state.go('selectCountry');
            } else {
                $('#popup_validation_error').addClass('active');
                $timeout(function () {
                    $('#popup_validation_error').removeClass('active');
                }, 1000);
            }
        };

        $scope.goToCustomerForm = function () {
            if (validateFields()) {
                LeadEntity.setTypeTestDrive($scope.data.lead.testdrive);
                LeadEntity.setTypeBrochures($scope.data.lead.brochure);
                LeadEntity.setTypeOffer($scope.data.lead.offer);

                LeadEntity.setOrderCars($scope.data.lead.cars);
                LeadEntity.setOrderAccessories($scope.data.lead.accessories);

                $state.go('customerForm');
            } else {
                $('#popup_validation_error').addClass('active');
                $timeout(function () {
                    $('#popup_validation_error').removeClass('active');
                }, 1000);
            }
        };

        var validateFields = function () {
            var isValid = true;

            if ($scope.data.lead.testdrive == false
                && $scope.data.lead.brochure == false
                && $scope.data.lead.offer == false) {

                isValid = false;
            }

            if ($scope.data.lead.cars.length == 0
                && $scope.data.lead.accessories.length == 0) {

                isValid = false;
            }

            return isValid;
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };

    }]);

}());