(function(){
    'use strict';

    var deps = [
    ];

    var app = angular.module('accessoryResource', deps);

    app.factory('AccessoryResourceService', ['$http', 'LocalStorageService', '$rootScope', function($http, LocalStorageService, $rootScope){
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/optionlist';

        var getAllByBrand = function(brand, scope, attrName){
            var onSuccess = function(responseData){
                scope[attrName] = responseData.data;
                LocalStorageService.saveAccessoryListByBrand(responseData.data, brand);
                $rootScope.dateOfDataLoad = new Date();
                LocalStorageService.saveDateOfData($rootScope.dateOfDataLoad);
            };

            var onError = function(errorData){
                $rootScope.$emit('cantLoadAccessoryData');
                console.log(errorData);
            };

            $http.get(self.endpoint + '?brand=' + brand + '&type=accessory').then(onSuccess,onError);
        };

        return{
            getAllByBrand : getAllByBrand
        }

    }]);
}());