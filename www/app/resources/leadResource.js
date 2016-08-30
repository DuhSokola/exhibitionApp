(function () {
    'use strict';

    var deps = [
        'app.leadEntity',
        'app.userEntity'
    ];

    var app = angular.module('app.leadResource', deps);

    app.factory('LeadResourceService', ['$rootScope', '$http', 'LeadEntity', 'UserEntity', 'LocalStorageService', function ($rootScope, $http, LeadEntity, UserEntity, LocalStorageService) {
        var self = this;

        //self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/leadsubmission';
        self.endpoint = 'https://www.leadcollector.amag.ch/exhibitionapp/backend/leadsubmission';


        var createURLParamChain = function (brand, customer, leadType, person, order, leadId) {

            var params =
                'salutation=' + customer.salutation +
                '&lang=' + customer.language +
                '&name=' + customer.firstname +
                '&surname=' + customer.lastname +
                '&street=' + customer.street +
                '&houseNumber=' + customer.houseNumber +
                '&zip=' + customer.zip +
                '&city=' + customer.city +
                '&phone=' + customer.phone +
                '&mail=' + customer.email +
                '&conditionsAccepted=' + customer.privacy +
                '&brand=' + brand +
                '&campaigncode=' + UserEntity.getCampaign().code +
                '&testdrive=' + leadType.testdrive +
                '&offerrequest=' + leadType.offer +
                '&orderbrochures=' + leadType.brochure +
                '&orderbrochureselectro=' + (leadType.brochureType == 'electronic') +
                '&newsletter=' + customer.newsletter +
                '&company=' + customer.firm +
                '&country=' + customer.country +
                '&dealer=' + ((customer.dealer.dealer != undefined) ? customer.dealer.dealer : '') +
                '&reachability=' +
                '&remarks=' + customer.remarks +
                '&salesperson=' + person.name + ' ' + person.surname +
                '&dynamicSearchResult=false' +
                '&collector=LeadApp_v2' +
                '&versionNumber=0.1.0' +
                '&contact=false' +
                '&leadactiontyp=' +
                '&age=' +
                '&currentBrand=' +
                '&currentModel=' +
                '&testmode=true';


            for (var i = 0; i < order.cars.length; i++) {
                params += '&vlcoptions=' + 'option_' + order.cars[i].code;
            }

            for (var j = 0; j < order.accessories.length; j++) {
                params += '&vlcoptions=' + 'option_' + order.accessories[j].code;
            }

            if(leadId){
                params += '&leadId='+leadId;
            }

            return params;
        };

        var persist = function (brand, customer, leadType, person, order, onSuccess, onError, leadId) {
            $http.get(self.endpoint + '?' + createURLParamChain(brand, customer, leadType, person, order, leadId)).then(onSuccess, onError);
        };

        var save = function () {
            persist(UserEntity.getBrand(), LeadEntity.getCustomer(), LeadEntity.getLeadType(), UserEntity.getPerson(), LeadEntity.getOrder(), function () {
                $rootScope.$broadcast('leadSendSuccess');
            }, function (errorData) {
                console.log(errorData);
                $rootScope.$broadcast('leadSendError');
                LocalStorageService.saveFailedLead();
            });
        };

        var resendFailedLeads = function () {
            var failedLeadsList = LocalStorageService.getFailedLeadList();
            if (failedLeadsList) {
                for (var i = 0; i < failedLeadsList.length; i++) {
                    var failedLead = JSON.parse(failedLeadsList[i]);
                    persist(failedLead.user.brand, failedLead.lead.customer, failedLead.lead.type, failedLead.user.person, failedLead.lead.order, function (res) {
                        LocalStorageService.removeLeadById(res.data.leadId);
                        $rootScope.$broadcast('failedLeadSendSuccess');
                    }, function (errorData) {
                        console.log(errorData);
                    },failedLead.id);
                }
            }
        };

        return {
            save: save,
            resendFailedLeads: resendFailedLeads
        }

    }]);
}());