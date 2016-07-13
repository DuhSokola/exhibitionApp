;(function () {
    'use strict';

    var dependencies = [
        'personResource'
    ];

    var app = angular.module('app.selectUser.directive', dependencies);

    app.directive('selectUser', function () {
        return {
            restrict: 'E',
            controller: 'SelectUserCtrl',
            scope: {
                ngModel: '=',
                selectList: '='
            },
            templateUrl: 'app/directives/selectUser/selectUser.tmpl.html',
            link: function (scope, element, attrs, SelectUserCtrl) {
                SelectUserCtrl.init(element, scope);
            }
        }
    });

    app.controller('SelectUserCtrl', ['$scope', function ($scope) {
        var self = this;

        this.init = function (element, scope) {
            self.$element = element;
            $scope.parent = scope;
            
            //bind selectList to $scope.campaignList
            scope.$watch('selectList', function(val){
                $scope.userList = val;
            });
        };

        $scope.$watch('userList', function (newVal) {
            if (newVal !== undefined && newVal !== '') {
                if (newVal.constructor === Array) {
                    if (newVal.length == 0) {
                        $scope.userList = [{
                            code: 'emptyList',
                            label: 'emptyList'
                        }];
                    }
                }
            }
        });

        $scope.select = function(val){
            $scope.selectedUser = val;
        };

        $scope.$watch('selectedUser', function (newVal) {
            $scope.parent.ngModel = newVal;
        });

    }]);
    
}());