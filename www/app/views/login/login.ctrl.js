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
        'campaignResource'
    ];

    var app = angular.module('app.login.ctrl', dependencies);

    app.controller('LoginCtrl', ['$scope', 'PersonResourceService', 'CampaignResourceService', '$timeout', function ($scope, PersonResourceService, CampaignResourceService, $timeout) {
        //define $scope objects for UI
        $scope.ui = {};
        $scope.ui.campaignList = undefined;
        $scope.ui.personList = undefined;
        
        //get UI data and save into $scope
        CampaignResourceService.getAll($scope.ui, 'campaignList');
        PersonResourceService.getAll($scope.ui, 'personList');
        
        $timeout(function(){
        }, 500);

        $scope.data = {};
        $scope.data.user = {};
        $scope.data.user.brand = undefined;
        $scope.data.user.language = undefined;
        $scope.data.user.campaign = undefined;
        $scope.data.user.person = undefined;
    }]);

}());