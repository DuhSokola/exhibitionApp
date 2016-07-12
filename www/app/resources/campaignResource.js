(function(){
    'use strict';

    var deps = [
    ];

    var app = angular.module('campaignResource', deps);

    app.factory('CampaignResourceService', ['$http', function($http){
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/campaignlist';

        var getAll = function(scope, attrName){
            var onSuccess = function(responseData){
                scope[attrName] = responseData.data;
            };

            var onError = function(errorData){
                console.log(errorData);
            };

            $http.get(self.endpoint + '?lang=de').then(onSuccess,onError);
        };

        return{
            getAll : getAll
        }

    }]);
}());