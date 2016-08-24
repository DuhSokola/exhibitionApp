(function () {
    'use strict';

    var deps = [
        'ngStorage',
        'app.leadEntity'
    ];

    var app = angular.module('app.localStorage', deps);

    app.factory('LocalStorageService', ['$rootScope', '$localStorage', 'LeadEntity', 'UserEntity', function ($rootScope, $localStorage, LeadEntity, UserEntity) {

        var storage = $localStorage;

        storage.$default({
            campaignList: [],
            personList: [],
            carList: {},
            accessoryList: {},
            lead: [],
            dateOfData: ''
        });

        console.log(storage);

        var saveCampaignList = function (campaignList) {
            storage.campaignList = campaignList;
        };
        var getCampaignList = function () {
            return storage.campaignList;
        };

        var savePersonList = function (personList) {
            storage.personList = personList;
        };
        var getPersonList = function () {
            return storage.personList;
        };

        var saveFailedLead = function () {
            var obj = {
                id: guid(),
                user: UserEntity.getUser(),
                lead: new LeadEntity.getLead()
            };
            storage.lead.push(JSON.stringify(obj));
            $rootScope.$broadcast('failedLeadSaved');
        };

        var getFailedLeadList = function () {
            return storage.lead;
        };

        var removeLeadById = function (id) {
            storage.lead = storage.lead.filter(function (el) {
                return new RegExp(id).test(el) === false;
            });
        };

        var saveCarListByBrand = function (carList, brand) {
            storage.carList[brand] = carList;
        };
        var getCarListByBrand = function (brand) {
            return storage.carList[brand];
        };

        var saveAccessoryListByBrand = function (accessoryList, brand) {
            storage.accessoryList[brand] = accessoryList;
        };
        var getAccessoryListByBrand = function (brand) {
            return storage.accessoryList[brand];
        };

        var guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        var getSizeOfFailedList = function () {
            return storage.lead.length;
        };

        var saveDateOfData = function (date) {
            storage.dateOfData = date;
        };

        var getDateOfData = function () {
            return storage.dateOfData;
        };

        return {
            saveCampaignList: saveCampaignList,
            getCampaignList: getCampaignList,
            savePersonList: savePersonList,
            getPersonList: getPersonList,
            saveCarListByBrand: saveCarListByBrand,
            getCarListByBrand: getCarListByBrand,
            saveAccessoryListByBrand: saveAccessoryListByBrand,
            getAccessoryListByBrand: getAccessoryListByBrand,
            saveFailedLead: saveFailedLead,
            getFailedLeadList: getFailedLeadList,
            removeLeadById: removeLeadById,
            getSizeOfFailedList: getSizeOfFailedList,
            saveDateOfData: saveDateOfData,
            getDateOfData: getDateOfData
        }

    }]);
}());