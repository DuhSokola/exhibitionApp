(function(){
    'use strict';

    var deps = [
        'ngStorage',
        'app.leadEntity'
    ];

    var app = angular.module('app.localStorage', deps);

    app.factory('LocalStorageService', ['$rootScope', '$localStorage', 'LeadEntity', function($rootScope, $localStorage, LeadEntity){

        var storage = $localStorage;

        var validateLead = function(){
            console.log(LeadEntity.getLead());
        };

        var saveFailedLead = function(obj){

        };

        return{
            validateLead : validateLead,
            saveFailedLead : saveFailedLead
        }

    }]);
}());