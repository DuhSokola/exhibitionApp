;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.selectLanguage.directive', dependencies);

    app.directive('selectLanguage', function () {
        return {
            restrict: 'E',
            controller: 'SelectLanguageCtrl',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/directives/selectLanguage/selectLanguage.tmpl.html',
            link: function (scope, element, attrs, SelectLanguageCtrl) {
                SelectLanguageCtrl.init(element, scope);
            }
        }
    });

    app.controller('SelectLanguageCtrl', ['$scope', function ($scope) {
        var self = this;

        this.init = function (element, scope) {
            self.$element = element;
            $scope.parent = scope;
            $scope.$watch('selectedLanguage', function (newVal) {
                if (newVal) {
                    $scope.parent.ngModel = newVal;
                }
            });
        };

    }]);

}());