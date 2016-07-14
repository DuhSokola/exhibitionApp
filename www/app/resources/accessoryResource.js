(function(){
    'use strict';

    var deps = [
    ];

    var app = angular.module('accessoryResource', deps);

    app.factory('AccessoryResourceService', ['$http', function($http){
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/optionlist';

        var getAllByBrand = function(brand, scope, attrName){
            var onSuccess = function(responseData){
                scope[attrName] = responseData.data;
            };

            var onError = function(errorData){
                console.log(errorData);
            };

            $http.get(self.endpoint + '?brand=' + brand + '&type=accessory').then(onSuccess,onError);
        };

        return{
            getAllByBrand : getAllByBrand
        }

    }]);
}());