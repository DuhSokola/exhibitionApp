(function(){
    'use strict';

    var deps = [
        'promiseUtils'
    ];

    var app = angular.module('app.dealerResource', deps);

    app.factory('DealerResource', ['$http', 'LocalStorageService', function($http, LocalStorageService){
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/dealerlist';

        var getAllByBrand = function(brand){
            var onSuccess = function(responseData){
                LocalStorageService.saveDealerListByBrand(responseData.data, brand);
            };

            var onError = function(errorData){
                $rootScope.$emit('cantLoadDealerData');
                console.log(errorData);
            };

            return $http.get(self.endpoint + '?brand=' + brand).then(onSuccess, onError);
        };


        var getAll = function(){
            getAllByBrand('vw');
            getAllByBrand('vwnf');
            getAllByBrand('audi');
            getAllByBrand('skoda');
            getAllByBrand('seat');
        };

        return{
            getAll : getAll,
            reloadDealerData : getAll
        }

    }]);
}());