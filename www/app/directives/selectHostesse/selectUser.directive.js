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
            SelectUserService.getCampaignList($scope, 'userList');
        };

        $scope.$watch('userList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if(newVal.length == 0){
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

    app.factory('UserListService', ['$http', 'promiseUtils', function ($http, promiseUtils) {

        var getHostesseList = function (scope, attrName) {
            promiseUtils.getPromiseHttpResult($http.get('https://www.leadcollector.amag.ch/exhibitionapp/backend/personlist?onlySalespersons=false')).then(function (result) {
                scope[attrName] = result;
            });
        };

        var getSalesPersonsList = function (scope, attrName) {
            promiseUtils.getPromiseHttpResult($http.get('https://www.leadcollector.amag.ch/exhibitionapp/backend/personlist?onlySalespersons=true')).then(function (result) {
                scope[attrName] = result;
            });
        };

        return {
            getHostesseList: getHostesseList,
            getSalesPersonsList: getSalesPersonsList
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

}());