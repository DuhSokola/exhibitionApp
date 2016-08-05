;(function () {
    'use strict';

    var dependencies = [
    ];

    var app = angular.module('app.selectItem.directive', dependencies);

    app.directive('selectItem', function () {
        return {
            restrict: 'E',
            controller: 'SelectItemCtrl',
            scope: {
                ngModel: '=',
                selectList: '='
            },
            templateUrl: 'app/directives/selectItem/selectItem.tmpl.html',
            link: function (scope, element, attrs, SelectItemCtrl) {
                SelectItemCtrl.init(element, scope, attrs);
            }
        }
    });

    app.controller('SelectItemCtrl', ['$scope', function ($scope) {
        var self = this;

        this.init = function (element, scope, attrs) {
            self.$element = element;
            $scope.parent = scope;
            $scope.itemList = undefined;
            $scope.label = attrs.slLabel;

            console.log(123);
            
            //bind selectList to $scope.itemList
            scope.$watch('selectList', function (val) {
                $scope.itemList = val;
            });
        };

        $scope.$watch('itemList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if (newVal.length == 0) {
                        $scope.itemList = [{
                            code: 'EmptyList',
                            label: 'EmptyList'
                        }];
                    }
                }
            }
        });

        $scope.$watch('selectedItem', function (newVal) {
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