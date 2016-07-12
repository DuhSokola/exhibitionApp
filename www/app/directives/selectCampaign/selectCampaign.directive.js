;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.selectCampaign.directive', dependencies);

    app.directive('selectCampaign', function () {
        return {
            restrict: 'E',
            controller: 'SelectCampaignCtrl',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/directives/selectCampaign/selectCampaign.tmpl.html',
            link: function (scope, element, attrs, SelectCampaignCtrl) {
                SelectCampaignCtrl.init(element, scope);
            }
        }
    });

    app.controller('SelectCampaignCtrl', ['$scope', 'SelectCampaignService', function ($scope, SelectCampaignService) {
        var self = this;

        this.init = function (element, scope) {
            self.$element = element;
            $scope.parent = scope;
            SelectCampaignService.getCampaignList($scope, 'campaignList');
        };

        $scope.$watch('campaignList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if(newVal.length == 0){
                        $scope.campaignList = [{
                            code: 'noCampaign',
                            label: 'noCampaignInDb'
                        }];
                    }
                }
            }
        });

        $scope.$watch('selectedCampaign', function (newVal) {
            $scope.parent.ngModel = newVal;
        });

    }]);

    app.factory('SelectCampaignService', ['$http', 'promiseUtils', function ($http, promiseUtils) {

        var getCampaignList = function (scope, attrName) {
            promiseUtils.getPromiseHttpResult($http.get('https://www.leadcollector.amag.ch/exhibitionapp/backend/campaignlist?lang=de')).then(function (result) {
                scope[attrName] = result;
            });
        };

        return {
            getCampaignList: getCampaignList
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