;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.selectUser.directive', dependencies);

    app.directive('selectUser', function () {
        return {
            restrict: 'E',
            controller: 'SelectUserCtrl',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/directives/selectUser/selectUser.tmpl.html',
            link: function (scope, element, attrs, SelectUserCtrl) {
                SelectUserCtrl.init(element, scope);
            }
        }
    });

    app.controller('SelectUserCtrl', ['$scope', 'SelectUserService', function ($scope, SelectUserService) {
        var self = this;

        this.init = function (element, scope) {
            self.$element = element;
            $scope.parent = scope;
            SelectUserService.getAllUsers($scope, 'userList');
        };

        $scope.$watch('userList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if (newVal.length == 0) {
                        $scope.campaignList = [{
                            code: 'emptyList',
                            label: 'emptyList'
                        }];
                    }
                }
            }
        });

        $scope.$watch('selectedUser', function (newVal) {
            $scope.parent.ngModel = newVal;
        });

    }]);

    app.factory('SelectUserService', ['$http', 'promiseUtils', function ($http, promiseUtils) {

        var getSalesPersonsList = function (scope, attrName) {
            promiseUtils.getPromiseHttpResult($http.get('https://www.leadcollector.amag.ch/exhibitionapp/backend/personlist?onlySalespersons=true')).then(function (result) {
                scope[attrName] = result;
            });
        };

        var getAllUsers = function (scope, attrName) {
            promiseUtils.getPromiseHttpResult($http.get('https://www.leadcollector.amag.ch/exhibitionapp/backend/personlist?onlySalespersons=false')).then(function (result) {
                scope[attrName] = result;
            });
        };

        return {
            getSalesPersonsList: getSalesPersonsList,
            getAllUsers: getAllUsers
        }
    }]);

    app.service('promiseUtils', ['$q', function ($q) {
        return {
            getPromiseHttpResult: function (httpPromise) {
                var deferred = $q.defer();
                httpPromise.success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject(arguments);
                });
                return deferred.promise;
            }
        }
    }]);
    
/*
    app.directive('ionSelect', function ($timeout) {
        return {
            restrict: 'EAC',
            scope: {
                labelField: '@',
                provider: '=',
                ngModel: '=?'
            },
            require: '?ngModel',
            transclude: false,
            replace: false,
            templateUrl: 'app/directives/selectUser/templ.html',
            link: function (scope, element, attrs, ngModel) {
                scope.ngValue = scope.ngValue !== undefined ? scope.ngValue : '';
                scope.selecionar = function (item) {
                    ngModel.$setViewValue(item);
                    scope.showHide = false;
                };

                element.bind('click', function () {
                    element.find('input').triggerHandler('focus');
                });

                scope.open = function () {
                    scope.ngModel = undefined;
                    $timeout(function () {
                        return scope.showHide = !scope.showHide;
                    }, 100);
                };
                scope.onKeyDown = function () {
                    scope.showHide = true;
                };

                scope.$watch('ngModel', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (scope.showHide === false) {
                            element.find('input').val(newValue[scope.labelField]);
                        }
                    }
                    if (!scope.ngModel) {
                        scope.showHide = false;
                    }
                });

            }
        };
    }).filter('dynamicFilter', ["$filter", function ($filter) {
        return function (array, keyValuePairs) {
            var obj = {}, i;
            for (i = 0; i < keyValuePairs.length; i += 2) {
                if (keyValuePairs[i] && keyValuePairs[i + 1]) {
                    obj[keyValuePairs[i]] = keyValuePairs[i + 1];
                }
            }
            return $filter('filter')(array, obj);
        }
    }]);*/

}());