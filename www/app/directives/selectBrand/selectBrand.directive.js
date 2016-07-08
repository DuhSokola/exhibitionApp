;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.selectBrand.directive', dependencies);

    app.directive('selectBrand', function () {
        return {
            restrict: 'E',
            controller: 'SelectBrandCtrl',
            scope: {
                ngModel: '='
            },
            templateUrl:'app/directives/selectBrand/selectBrand.tmpl.html',
            link: function (scope, element, attrs, SelectBrandCtrl) {
                SelectBrandCtrl.init(element, scope);
            }
        }
    });

    app.controller('SelectBrandCtrl', ['$scope', function ($scope) {
        var self = this;

        this.init = function (element, scope) {
            self.$element = element;
            $scope.parent = scope;
            addListeners();
        };

        var addListeners = function(){
            var columns = $(self.$element).find('.col');
            angular.forEach(columns, function(column){
                column = $(column);

                column.bind("click", function(){
                    console.log(column.find('img').attr('data-value'));
                });


            });
        };

    }]);

}());