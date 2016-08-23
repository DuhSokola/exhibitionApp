(function () {
    'use strict';

    var deps = [];

    var app = angular.module('personResource', deps);

    app.factory('PersonResourceService', ['$http', function ($http) {
        var self = this;

        //self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/personlist';
        self.endpoint = 'http://localhost:8083/personlist';

        var getAll = function (scope, attrName) {
            var onSuccess = function (responseData) {
                scope[attrName] = responseData.data;
            };

            var onError = function (errorData) {
                console.log(errorData);
            };

            //TODO set to false
            $http.get(self.endpoint + '?onlySalespersons=true').then(onSuccess, onError);
        };

        var getAllByBrand = function (brand, scope, attrName) {
            var onSuccess = function (responseData) {
                scope[attrName] = responseData.data;
            };

            var onError = function (errorData) {
                console.log(errorData);
            };

            $http.get(self.endpoint + '?onlySalespersons=false&brand=' + brand).then(onSuccess, onError);
        };

        //TODO
        var getSalesPersons = function (scope, attrName) {

        };

        //TODO
        var getHostesses = function (scope, attrName) {

        };

        return {
            getAll: getAll,
            getAllByBrand: getAllByBrand,
            getSalesPersons: getSalesPersons,
            getHostesses: getHostesses
        }

    }]);
}());