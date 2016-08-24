(function(){
    'use strict';

    var deps = [
        'accessoryResource'
    ];

    var app = angular.module('accessoryData', deps);

    app.factory('AccessoryDataService', ['AccessoryResourceService', '$rootScope', 'LocalStorageService', function(AccessoryResourceService, $rootScope, LocalStorageService){

        $rootScope.accessoryData = {
            vw : [],
            vwnf : [],
            audi : [],
            skoda : [],
            seat : []
        };

        var loadAccessoryData = function(){
            $rootScope.accessoryData.vw = LocalStorageService.getAccessoryListByBrand('vw');
            $rootScope.accessoryData.vwnf = LocalStorageService.getAccessoryListByBrand('vwnf');
            $rootScope.accessoryData.audi = LocalStorageService.getAccessoryListByBrand('audi');
            $rootScope.accessoryData.skoda = LocalStorageService.getAccessoryListByBrand('skoda');
            $rootScope.accessoryData.seat = LocalStorageService.getAccessoryListByBrand('seat');
            AccessoryResourceService.getAllByBrand('vw', $rootScope.accessoryData, 'vw');
            AccessoryResourceService.getAllByBrand('vwnf', $rootScope.accessoryData, 'vwnf');
            AccessoryResourceService.getAllByBrand('audi', $rootScope.accessoryData, 'audi');
            AccessoryResourceService.getAllByBrand('skoda', $rootScope.accessoryData, 'skoda');
            AccessoryResourceService.getAllByBrand('seat', $rootScope.accessoryData, 'seat');
        };

        var getAccessoryData = function(){
            return $rootScope.accessoryData;
        };

        return{
            initAccessoryData : loadAccessoryData,
            reloadAccessoryData : loadAccessoryData,
            getAccessoryData : getAccessoryData
        }

    }]);
}());