;(function () {
    'use strict';

    var dependencies = [
        'app.selectBrand.directive',
        'app.selectLanguage.directive',
        'app.selectItem.directive',
        'app.selectUser.directive',
        'app.leadEntity',
        'ui.select',
        'ngSanitize',
        'personResource',
        'campaignResource',
        'app.userEntity',
        'carData',
        'accessoryData'
    ];

    var app = angular.module('app.login.ctrl', dependencies);

    app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'PersonResourceService', 'CampaignResourceService', 'CarDataService', 'AccessoryDataService', 'UserEntity', 'LeadEntity', '$translate', 'LocalStorageService', 'LeadResourceService', '$timeout', function ($scope, $rootScope, $state, PersonResourceService, CampaignResourceService, CarDataService, AccessoryDataService, UserEntity, LeadEntity, $translate, LocalStorageService, LeadResourceService, $timeout) {

        $rootScope.dateOfDataLoad = new Date(LocalStorageService.getDateOfData());

        //define $scope objects for UI
        $scope.ui = {};
        $scope.ui.campaignList = undefined;
        $scope.ui.personList = undefined;
        $scope.ui.failedLeadSize = LocalStorageService.getSizeOfFailedList();
        $scope.ui.userSearch = {};
        $scope.ui.userSearch.firstname = '';
        $scope.ui.userSearch.lastname = '';

        //get UI data and save into $scope
        CampaignResourceService.getAll($scope.ui, 'campaignList');
        PersonResourceService.getAll($scope.ui, 'personList');

        $scope.data = {};
        $scope.data.user = {};
        $scope.data.user.brand = UserEntity.getBrand();
        $scope.data.user.language = UserEntity.getLanguage();

        if (UserEntity.getCampaign().constructor == {}.constructor) {
            try {
                $scope.data.user.campaign = JSON.stringify(UserEntity.getCampaign());
            } catch (ex) {
                $scope.data.user.campaign = UserEntity.getCampaign();
            }
        }
        $scope.data.user.person = UserEntity.getPerson();

        var initStyles = function () {
            if ($scope.data.user.brand) {
                $('select-brand .col.'+$scope.data.user.brand).addClass('selected');
            }
            if ($scope.data.user.language){
                console.log($scope.data.user.language);
                $('select-language .radio-icon').css('visibility', 'hidden');
                $('select-language .item[name='+$scope.data.user.language+'] .radio-icon').css('visibility', 'visible');
            }
        };

        $timeout(function () {
            initStyles();
        },100);

        $scope.$watch('data.user.language', function(newVal){
            if(newVal){
                $('select-language .radio-icon').css('visibility', 'hidden');
                $('select-language .item[name='+newVal+'] .radio-icon').css('visibility', 'visible');
            }
        });

        $scope.login = function () {
            if (fieldsAreValid()) {
                UserEntity.setBrand($scope.data.user.brand);
                UserEntity.setLanguage($scope.data.user.language);
                UserEntity.setCampaign(JSON.parse($scope.data.user.campaign));
                UserEntity.setPerson($scope.data.user.person);

                console.log("You are logged in:");
                console.log("Brand: " + UserEntity.getBrand());
                console.log("Language: " + UserEntity.getLanguage());
                console.log("Campaign: " + UserEntity.getCampaign().label);
                console.log("Person: " + UserEntity.getPerson().name + ' ' + UserEntity.getPerson().surname);
                console.log("Person DEALER: " + UserEntity.getPerson().dealer);

                LeadEntity.resetAll();
                $state.go('selectModel');
            } else {
                $('#popup_validation_error2').addClass('active');
                $timeout(function () {
                    $('#popup_validation_error2').removeClass('active');
                }, 1000);
            }
        };

        $scope.selectUser = function (user) {
            $scope.data.user.person = user;
            $('#popup_userSearch').removeClass('active');
        };

        $scope.removeUser = function () {
            $scope.data.user.person = '';
            $('#popup_userSearch').removeClass('active');
        };

        $scope.$watch('data.user.language', function (newVal) {
            if (newVal) {
                $translate.use(newVal);
            }
        });

        $scope.$watch('data.user.brand', function (newVal) {
            if (newVal) {
                PersonResourceService.getAllByBrand(newVal, $scope.ui, 'personList');
            }
        });

        $scope.$on('failedLeadSendSuccess', function () {
            $scope.ui.failedLeadSize = LocalStorageService.getSizeOfFailedList();
        });

        $scope.reloadData = function () {
            CarDataService.reloadCarData();
            AccessoryDataService.reloadAccessoryData();
            DealerResource.getAll();
        };

        $scope.resendLeads = function () {
            LeadResourceService.resendFailedLeads();
        };

        var fieldsAreValid = function () {
            if (!$scope.data.user.brand || !$scope.data.user.language || !$scope.data.user.campaign || !$scope.data.user.person) {
                return false;
            }
            return true;
        }

    }]);

}());