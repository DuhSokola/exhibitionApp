;(function () {
    'use strict';

    var dependencies = [
        'app.selectBrand.directive',
        'app.selectLanguage.directive',
        'app.selectCampaign.directive',
        'app.selectUser.directive',
        'ui.select',
        'ngSanitize',
        'personResource',
        'campaignResource',
        'app.userEntity',
        'carData',
        'accessoryData'
    ];

    var app = angular.module('app.login.ctrl', dependencies);

    app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'PersonResourceService', 'CampaignResourceService', 'CarDataService', 'AccessoryDataService', 'UserEntity', function ($scope, $rootScope, $state, PersonResourceService, CampaignResourceService, CarDataService, AccessoryDataService, UserEntity) {
        //define $scope objects for UI
        $scope.ui = {};
        $scope.ui.campaignList = undefined;
        $scope.ui.personList = undefined;

        //get UI data and save into $scope
        CampaignResourceService.getAll($scope.ui, 'campaignList');
        PersonResourceService.getAll($scope.ui, 'personList');

        $scope.data = {};
        $scope.data.user = {};
        $scope.data.user.brand = undefined;
        $scope.data.user.language = undefined;
        $scope.data.user.campaign = undefined;
        $scope.data.user.person = undefined;

        $scope.login = function () {
            if (fieldsAreValid()) {
                UserEntity.setBrand($scope.data.user.brand);
                UserEntity.setLanguage($scope.data.user.language);
                UserEntity.setCampaign($scope.data.user.campaign);
                UserEntity.setPerson($scope.data.user.person);

                console.log("You are logged in:");
                console.log("Brand: " + UserEntity.getBrand());
                console.log("Language: " + UserEntity.getLanguage());
                console.log("Campaign: " + UserEntity.getCampaign().label);
                console.log("Person: " + UserEntity.getPerson().name + ' ' + UserEntity.getPerson().surname);
                
                $rootScope.refresh = true;
                $state.go('selectModel');
            }
        };

        $scope.reloadData = function(){
            CarDataService.reloadCarData();
            AccessoryDataService.reloadAccessoryData();
            console.log('reload Data');
        };

        var fieldsAreValid = function () {
            if (!$scope.data.user.brand || !$scope.data.user.language || !$scope.data.user.campaign || !$scope.data.user.person) {

                alert("Bitte alle Felder ausfüllen");
                return false;
            }
            return true;
        }

    }]);

}());