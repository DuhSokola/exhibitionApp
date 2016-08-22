(function () {
    'use strict';

    var deps = [
        'app.leadEntity',
        'app.userEntity'
    ];

    var app = angular.module('app.leadResource', deps);

    app.factory('LeadResourceService', ['$rootScope', '$http', 'LeadEntity', 'UserEntity', function ($rootScope, $http, LeadEntity, UserEntity) {
        var self = this;

        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/leadsubmission';


        var createURLParamChain = function () {
            var params =
                'salutation=' + LeadEntity.getCustomer().salutation +
                '&lang=' + LeadEntity.getCustomer().language +
                '&name=' + LeadEntity.getCustomer().firstname +
                '&surname=' + LeadEntity.getCustomer().lastname +
                '&street=' + LeadEntity.getCustomer().street +
                '&houseNumber=' + LeadEntity.getCustomer().houseNumber +
                '&zip=' + LeadEntity.getCustomer().zip +
                '&city=' + LeadEntity.getCustomer().city +
                '&phone=' + LeadEntity.getCustomer().phone +
                '&mail=' + LeadEntity.getCustomer().email +
                '&orderbrochureselectro=' + (LeadEntity.getLeadType().brochure == 'electronic') +
                '&conditionsAccepted=' + LeadEntity.getCustomer().privacy +
                '&brand=' + UserEntity.getBrand() +
                //'&campaigncode=' + UserEntity.getCampaign().code +
                '&campaigncode=' + 'testcamp' +
                '&testdrive=' + LeadEntity.getLeadType().testdrive +
                '&orderbrochures=' + (LeadEntity.getLeadType().brochure.length > 0) +
                '&newsletter=' + LeadEntity.getCustomer().newsletter +
                '&company=' + LeadEntity.getCustomer().firm +
                '&country=' + LeadEntity.getCustomer().country +
                '&dealer=' + ((LeadEntity.getCustomer().seller.code != undefined) ? LeadEntity.getCustomer().seller.code : '') +
                '&reachability=' +
                '&remarks=' + LeadEntity.getCustomer().remarks +
                '&salesperson=' + UserEntity.getPerson().name + ' ' + UserEntity.getPerson().surname +
                '&dynamicSearchResult=false' +
                '&collector=LeadApp_v2' +
                '&versionNumber=0.1.0' +
                '&contact=false' +
                '&leadactiontyp=' +
                '&age=' +
                '&currentBrand=' +
                '&currentModel=' +
                '&testmode=true';

            for (var i = 0; i < LeadEntity.getOrder().cars.length; i++) {
                params += '&vlcoptions=' + 'option_' + LeadEntity.getOrder().cars[i].code;
            }

            for (var j = 0; j < LeadEntity.getOrder().accessories.length; j++) {
                params += '&vlcoptions=' + 'option_' + LeadEntity.getOrder().accessories[j].code;
            }

            return params;
        };


        var save = function () {
            var onSuccess = function(){
                $rootScope.$broadcast('leadSendSuccess');
            };

            var onError = function(errorData){
                console.log(errorData);
                $rootScope.$broadcast('leadSendError');
            };

            $http.get(self.endpoint+'?'+createURLParamChain()).then(onSuccess, onError);
        };

        return {
            save: save
        }

    }]);
}());