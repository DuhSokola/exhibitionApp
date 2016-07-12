(function () {
    'use strict';

    var deps = [];

    var app = angular.module('promiseUtils', deps);

    app.factory('promiseUtilService', ['$q', function ($q) {
        var runPromise = function (httpRequestObj, success, error) {
            var deferred = $q.defer();

            httpRequestObj.success(function (data) {
                deferred.resolve(data);
                if (angular.isFunction(success)) {
                    success(deferred.promise.$$state.value);
                }
            }).error(function () {
                deferred.reject(arguments);
                if (angular.isFunction(error)) {
                    error(deferred.promise.$$state);
                }
            });

            return deferred.promise;
        };

        return {
            runPromise: runPromise
        }

    }]);

}());



