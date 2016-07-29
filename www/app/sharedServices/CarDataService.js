(function(){
    'use strict';

    var deps = [
        'carResource'
    ];

    var app = angular.module('carData', deps);

    app.factory('CarDataService', ['CarResourceService', '$rootScope', function(CarResourceService, $rootScope){

        $rootScope.carData = {
            vw : [],
            vwnf : [],
            audi : [],
            skoda : [],
            seat : []
        };

        var loadCarData = function(){
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