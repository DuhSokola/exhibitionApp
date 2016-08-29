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
                '&orderbrochureselectro=' + (leadType.brochure == 'electronic') +
                '&conditionsAccepted=' + customer.privacy +
                '&brand=' + brand +
                '&campaigncode=' + UserEntity.getCampaign().code + //TODO
                //'&campaigncode=' + 'testcamp' +
                '&testdrive=' + leadType.testdrive +
                '&orderbrochures=' + (leadType.brochure.length > 0) +
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

            /*var params =
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
             '&testmode=true';*/

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
                //TODO DELETE
                LocalStorageService.saveFailedLead();
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