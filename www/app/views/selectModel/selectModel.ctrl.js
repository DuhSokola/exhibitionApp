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

    app.controller('SelectModelCtrl', ['$scope', '$rootScope', '$state', 'UserEntity', 'LeadEntity', 'CarDataService', 'AccessoryDataService', '$timeout', function ($scope, $rootScope, $state, UserEntity, LeadEntity, CarDataService, AccessoryDataService, $timeout) {
        $scope.ui = {};
        $scope.data = {};

        var initializeUiData = function () {
            $scope.ui = {
                carList: [],
                accessoryList: [],
                campaign: undefined,
                brand: undefined,
                person: undefined
            };

            $scope.ui.campaign = UserEntity.getCampaign();
            $scope.ui.brand = UserEntity.getBrand();
            $scope.ui.person = UserEntity.getPerson();

            //TODO Delete row
            $scope.ui.brand = 'seat';

            $scope.ui.carList = CarDataService.getCarData();
            $scope.ui.accessoryList = AccessoryDataService.getAccessoryData();
        };

        var initializeLeadData = function () {
            $scope.data.lead = {
                testdrive: false,
                brochure: false,
                offer: false,
                cars: [],
                accessories: []
            }
        };

        initializeUiData();
        initializeLeadData();

        $rootScope.$on('resetAllViews', function(){
                console.log('reset selectModel scope');
                initializeUiData();
                initializeLeadData();
                $scope.reset();
        });

        $scope.selectOrderOption = function ($event, option) {
            var element = $($event.target);

            //Toggle Value
            if (option === 'testdrive') {
                $scope.data.lead.testdrive = !$scope.data.lead.testdrive;
            }
            else if (option === 'catalog') {
                $scope.data.lead.brochure = !$scope.data.lead.brochure;
            }
            else if (option === 'offer') {
                $scope.data.lead.offer = !$scope.data.lead.offer;
            }

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
        };

        $scope.toggleSelectAccessory = function ($event, item) {
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
        };

        $scope.reset = function () {
            initializeLeadData();
            $('.selectLeadType').find('button').removeClass('selected');
            $('.selectLeadType').find('icon').addClass('hidden');
            $('.tableRow').removeClass('selected');
            $('.tableRow').find('icon').addClass('hidden');
        };

        $scope.goToCountrySelect = function () {
            //TODO Validate Data
            LeadEntity.setTypeTestDrive($scope.data.lead.testdrive);
            LeadEntity.setTypeBrochures($scope.data.lead.brochure);
            LeadEntity.setTypeOffer($scope.data.lead.offer);

            LeadEntity.setOrderCars($scope.data.lead.cars);
            LeadEntity.setOrderAccessories($scope.data.lead.accessories);

            $state.go('selectCountry');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };

    }]);

}());