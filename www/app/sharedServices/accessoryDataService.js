(function(){
    'use strict';

    var deps = [
        'accessoryResource'
    ];

    var app = angular.module('accessoryData', deps);

    app.factory('AccessoryDataService', ['AccessoryResourceService', '$rootScope', function(AccessoryResourceService, $rootScope){

        $rootScope.accessoryData = {
            vw : [],
            vwnf : [],
            audi : [],
            skoda : [],
            seat : []
        };

        var loadAccessoryData = function(){
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