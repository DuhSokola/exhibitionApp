(function(){
    'use strict';

    var deps = [
        'carResource',
        'app.localStorage'
    ];

    var app = angular.module('carData', deps);

    app.factory('CarDataService', ['CarResourceService', '$rootScope', 'LocalStorageService', function(CarResourceService, $rootScope, LocalStorageService){

        $rootScope.carData = {
            vw : [],
            vwnf : [],
            audi : [],
            skoda : [],
            seat : []
        };

        var loadCarData = function(){
            $rootScope.carData.vw = LocalStorageService.getCarListByBrand('vw');
            $rootScope.carData.vwnf = LocalStorageService.getCarListByBrand('vwnf');
            $rootScope.carData.audi = LocalStorageService.getCarListByBrand('audi');
            $rootScope.carData.skoda = LocalStorageService.getCarListByBrand('skoda');
            $rootScope.carData.seat = LocalStorageService.getCarListByBrand('seat');
            CarResourceService.getAllByBrand('vw', $rootScope.carData, 'vw');
            CarResourceService.getAllByBrand('vwnf', $rootScope.carData, 'vwnf');
            CarResourceService.getAllByBrand('audi', $rootScope.carData, 'audi');
            CarResourceService.getAllByBrand('skoda', $rootScope.carData, 'skoda');
            CarResourceService.getAllByBrand('seat', $rootScope.carData, 'seat');
        };
        
        var getCarData = function(){
            return $rootScope.carData;
        };

        return{
            initCarData : loadCarData,
            reloadCarData : loadCarData,
            getCarData : getCarData
        }

    }]);
}());