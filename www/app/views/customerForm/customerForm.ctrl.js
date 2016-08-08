;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity',
        'app.selectItem.directive',
        'ngSanitize'
    ];

    var app = angular.module('app.customerForm.ctrl', dependencies);

    app.controller('CustomerFormCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', function ($scope, $state, LeadEntity, UserEntity) {

        $scope.data = {};
        var initData = function () {
            $scope.data.catalogTyp = undefined;
            $scope.data.salutation = undefined;
            $scope.data.firstname = undefined;
            $scope.data.lastname = undefined;
            $scope.data.firm = undefined;
            $scope.data.street = undefined;
            $scope.data.streetNr = undefined;
            $scope.data.zip = undefined;
            $scope.data.city = undefined;
            $scope.data.phone = undefined;
            $scope.data.email = undefined;
            $scope.data.country = undefined;
            $scope.data.seller = undefined;
            $scope.data.remarks = undefined;
            $scope.data.privacy = false;
            $scope.data.newsletter = false;
        };
        initData();

        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();

        $scope.ui.countryList = [{label:'x123', code:'x123'},{label:'1234', code:'1234'},{label:'1235', code:'1235'}];
        $scope.ui.sallerList = [{label:'123', code:'123'},{label:'1234', code:'1234'},{label:'1235', code:'1235'}];


        $scope.$watch('data.catalogTyp',function(newVal){
            var electroElem = $('.catalogTyp .radios label[id="radioElectronic"] .item-content');
            var printedElem = $('.catalogTyp .radios label[id="radioPrinted"] .item-content');
            if (newVal === 'electronic') {
                electroElem.addClass('selected');
                printedElem.removeClass('selected');
            } else if (newVal === 'printed') {
                printedElem.addClass('selected');
                electroElem.removeClass('selected');
            } else if (newVal === undefined){
                electroElem.removeClass('selected');
                printedElem.removeClass('selected');
            }
        });

        $scope.$watch('data.salutation',function(newVal){
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
            LeadEntity.resetAll();
            $state.go('login');
        };

    }]);

}());