;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.leadEntity', dependencies);

    app.factory('LeadEntity', function () {
        var self = this;


        self.lead = {};

        var initLeadType = function () {
            self.lead.type = {
                testdrive: false,
                brochure: false,
                offer: false
            };
        };

        var initLeadOrder = function () {
            self.lead.order = {
                cars: [],
                accessories: []
            };
        };

        var initLeadCutomer = function () {
            self.lead.customer = {
                language: undefined,
                country: undefined
            };
        };

        initLeadType();
        initLeadOrder();
        initLeadCutomer();

        return {
            getLead: function () {
                return self.lead;
            },
            resetAll: function () {
                initLeadType();
                initLeadOrder();
                initLeadCutomer();
            },

            getLeadType: function () {
                return self.lead.type;
            },
            resetLeadType: function () {
                initLeadType();
            },
            setTypeTestDrive: function (_testdrive) {
                self.lead.type.testdrive = _testdrive;
            },
            setTypeBrochures: function (_brochure) {
                self.lead.type.brochure = _brochure;
            },
            setTypeOffer: function (_offer) {
                self.lead.type.offer = _offer;
            },

            getOrder: function () {
                return self.lead.order;
            },
            resetOrder: function () {
                initLeadOrder();
            },
            setOrderCars: function (_cars) {
                self.lead.order.cars = _cars;
            },
            setOrderAccessories: function (_accessories) {
                self.lead.order.accessories = _accessories;
            },

            getCustomer: function () {
                return self.lead.customer;
            },
            resetCutomer: function () {
                initLeadCutomer();
            },
            setCustomerLanguage: function (_language) {
                self.lead.customer.language = _language;
            },
            setCustomerCountry: function (_country) {
                self.lead.customer.country = _country;
            }

        }
    });

}());