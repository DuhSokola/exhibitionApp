(function(){
    'use strict';

    var deps = [
        'promiseUtils'
    ];

    var app = angular.module('carResource', deps);

    app.factory('CarResourceService', ['$http', function($http){
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/optionlist';

        var getAllByBrand = function(brand, scope, attrName){
            var onSuccess = function(responseData){
                scope[attrName] = responseData.data;
            };

            var onError = function(errorData){
                console.log(errorData);
            };
            
            return $http.get(self.endpoint + '?brand=' + brand + '&type=model').then(onSuccess, onError);
        };

        return{
            getAllByBrand : getAllByBrand
        }

    }]);
}());