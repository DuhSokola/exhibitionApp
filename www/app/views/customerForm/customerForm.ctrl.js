;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity'
    ];

    var app = angular.module('app.customerForm.ctrl', dependencies);

    app.controller('CustomerFormCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', function ($scope, $state, LeadEntity, UserEntity) {

        $scope.data = {};

        $scope.data.customer = {};

        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();
        

        $scope.selectCatalogTyp = function(option){
            var electroElem = $('.catalogTyp .radios label[id="radioElectronic"] .item-content');
            var printedElem = $('.catalogTyp .radios label[id="radioPrinted"] .item-content');

            if(option === 'electronic'){
                electroElem.addClass('selected');
                printedElem.removeClass('selected');
            }else if(option === 'printed'){
                printedElem.addClass('selected');
                electroElem.removeClass('selected');
            }
        };

        $scope.selectSalutation = function(option){
            var salutationMElem = $('.salutation .radios label[id="salutationM"] .item-content');
            var salutationFElem = $('.salutation .radios label[id="salutationF"] .item-content');

            if(option === 'm'){
                salutationMElem.addClass('selected');
                salutationFElem.removeClass('selected');
            }else if(option === 'f'){
                salutationFElem.addClass('selected');
                salutationMElem.removeClass('selected');
            }
        };

        $scope.goBack = function () {
            //Reset Form
            $state.go('selectModel');
        };

        $scope.goToHomePage = function () {
            LeadEntity.resetAll();
            $state.go('login');
        };

    }]);

}());