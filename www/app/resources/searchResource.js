(function () {
    'use strict';

    var deps = [];

    var app = angular.module('app.searchResource', deps);

    app.factory('SearchResourceService', ['$http', '$rootScope', function ($http, $rootScope) {
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/customersearch';

        var search = function (scope, attrName, firstname, lastname, zip, city, phone) {
            var onSuccess = function (responseData) {
                $rootScope.$broadcast('searchDone');
                scope[attrName] = responseData.data;
            };

            var onError = function (errorData) {
                scope[attrName] = -1;
                console.log(errorData);
            };

            var pa = 'searchSurname=' + (lastname == undefined ? '' : lastname) +
                '&searchName=' + (firstname == undefined ? '' : firstname) +
                '&searchZIP=' + (zip == undefined ? '' : zip) +
                '&searchCity=' + (city == undefined ? '' : city) +
                '&searchPhone=' + (phone == undefined ? '' : phone) +
                '&searchCanton=';

            //TODO set to false
            $http.get(self.endpoint + '?' + pa + '&authenticationToken=only4AMAG!').then(onSuccess, onError);
        };

        return {
            search: search
        }

    }]);
}());