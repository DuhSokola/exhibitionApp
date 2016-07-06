;(function(){
    'use strict';

    var dependencies = [

    ];

    var app = angular.module('app.selectBrand.directive', dependencies);

    app.directive('selectBrand', function(){
       return {
           restrict: 'E',
           controller: 'SelectBrandCtrl',
           scope: {
               ngModel: '='
           },
           link: function(scope, element, attrs, SelectBrandCtrl){
               SelectBrandCtrl.init(element);
           }
       }
    });

    app.controller('SelectBrandCtrl', [function(){
        var self = this;

        this.init = function(element){
            self.$element = element;
            renderHtmlTemplate();
        };

        var renderHtmlTemplate = function(){
            var html = '<div>TEST</div>';
            self.$element.replaceWith(html);
        };

    }]);
    
}());