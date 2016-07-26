;(function () {
    'use strict';

    var dependencies = [
        'campaignResource'
    ];

    var app = angular.module('app.selectCampaign.directive', dependencies);

    app.directive('selectCampaign', function () {
        return {
            restrict: 'E',
            controller: 'SelectCampaignCtrl',
            scope: {
                ngModel: '=',
                selectList: '=',
            },
            templateUrl: 'app/directives/selectCampaign/selectCampaign.tmpl.html',
            link: function (scope, element, attrs, SelectCampaignCtrl) {
                SelectCampaignCtrl.init(element, scope, attrs);
            }
        }
    });

    app.controller('SelectCampaignCtrl', ['$scope', function ($scope) {
        var self = this;

        this.init = function (element, scope, attrs) {
            self.$element = element;
            $scope.parent = scope;
            $scope.campaignList = undefined;
            $scope.label = attrs.slLabel;

            //bind selectList to $scope.campaignList
            scope.$watch('selectList', function (val) {
                $scope.campaignList = val;
            });
        };

        $scope.$watch('campaignList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if (newVal.length == 0) {
                        $scope.campaignList = [{
                            code: 'noCampaign',
                            label: 'noCampaignInDb'
                        }];
                    }
                }
            }
        });

        $scope.$watch('selectedCampaign', function (newVal) {
            if (newVal) {
                if (newVal.constructor !== {}.constructor) {
                    try {
                        $scope.parent.ngModel = JSON.parse(newVal);
                    } catch (ex) {
                        $scope.parent.ngModel = newVal;
                    }
                }
            }
        });

    }]);

}());