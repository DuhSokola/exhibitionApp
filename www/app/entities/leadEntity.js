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
                country: undefined,
                salutation: undefined,
                firstname: undefined,
                lastname: undefined,
                houseNumber: undefined,
                street: undefined,
                zip: undefined,
                city: undefined,
                phone: undefined
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
            },
            setCustomerSalutation: function (_salutation) {
                self.lead.customer.salutation = _salutation;
            },
            setCustomerFirstname: function (_firstname) {
                self.lead.customer.firstname = _firstname;
            },
            setCustomerLastname: function (_lastname) {
                self.lead.customer.lastname = _lastname;
            },
            setCustomerHouseNumber: function (_houseNumber) {
                self.lead.customer.houseNumber = _houseNumber;
            },
            setCustomerStreet: function (_street) {
                self.lead.customer.street = _street;
            },
            setCustomerZip: function (_zip) {
                self.lead.customer.zip = _zip;
            },
            setCustomerCity: function (_city) {
                self.lead.customer.city = _city;
            },
            setCustomerPhone: function (_phone) {
                self.lead.customer.phone = _phone;
            }

        }
    });

}());