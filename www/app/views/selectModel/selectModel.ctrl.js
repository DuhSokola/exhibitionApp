;(function () {
    'use strict';

    var dependencies = [
        'carResource',
        'accessoryResource',
        'carData'
    ];

    var app = angular.module('app.selectModel.ctrl', dependencies);

    app.controller('SelectModelCtrl', ['$scope', '$rootScope', '$state', 'UserEntity', 'CarDataService', 'AccessoryResourceService', '$timeout', function ($scope, $rootScope, $state, UserEntity, CarDataService, AccessoryResourceService, $timeout) {
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

            //TODO
            $scope.ui.brand = 'seat';

            $scope.ui.carList = CarDataService.getCarData();

            AccessoryResourceService.getAllByBrand($scope.ui.brand, $scope.ui, 'accessoryList');
        };

        var initializeLeadData = function () {
            $scope.data.lead = {
                testdrive : false,
                brochure : false,
                offer: false,
                cars: [],
                accessories: []
            }
        };

        initializeUiData();
        initializeLeadData();

        $timeout(function(){
            console.log($scope.ui);
        },1000);

        $scope.toggleSelectCar = function(){
            
        };

        $scope.toggleSelectAccessory = function(){

        };

        var selectCar = function(car){
            $scope.data.lead.cars.push(car);
        };

        var deselectCar = function(car){
            //TODO
        };

        var selectAccessory = function(accessory){
            $scope.data.lead.accessories.push(accessory);
        };

        var deselectAccessory = function(car){
            //TODO
        };

        $scope.resetLead = function(){
            initializeLeadData();
        };

        $scope.goToCountrySelect = function(){
            $state.go('selectCountry');
        };

        $scope.goToHomePage = function(){
            $state.go('login');
        };

    }]);

}());