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
                brochureType: '',
                offer: false
            };
        };

        var initLeadOrder = function () {
            self.lead.order = {
                brand: '',
                cars: [],
                accessories: []
            };
        };

        var initLeadCutomer = function () {
            self.lead.customer = {
                language: '',
                country: '',
                salutation: '',
                firstname: '',
                lastname: '',
                houseNumber: '',
                street: '',
                zip: '',
                city: '',
                phone: '',
                email: '',
                seller: '',
                firm: '',
                remarks: '',
                newsletter: false,
                privacy: false,
                mode: ''
            };
        };

        var initSearchParams = function () {
            self.search = {
                firstname: '',
                lastname: '',
                phone: '',
                zip: '',
                city: ''
            };
        };

        initLeadType();
        initLeadOrder();
        initLeadCutomer();
        initSearchParams();

        return {
            getLead: function () {
                return self.lead;
            },
            resetAll: function () {
                initLeadType();
                initLeadOrder();
                initLeadCutomer();
                initSearchParams();
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
            },
            setCustomerEmail: function(_email){
                self.lead.customer.email = _email;
            },
            setCustomerSeller: function (_seller) {
                self.lead.customer.seller = _seller;
            },
            setCustomerFirm: function (_firm) {
                self.lead.customer.firm = _firm;
            },
            setCustomerRemarks: function (_remarks) {
                self.lead.customer.remarks = _remarks;
            },
            setCustomerNewsletter: function (_newsletter) {
                self.lead.customer.newsletter = _newsletter;
            },
            setCustomerPrivacy: function (_privacy) {
                self.lead.customer.privacy = _privacy;
            },
            setBrand: function(_brand){
                self.lead.order.brand = _brand;
            },
            setMode: function(_mode){
                self.lead.customer.mode = _mode;
            },
            getSearch : function(){
                return self.search;
            },
            setSearchFirstname : function(_val){
                return self.search.firstname = _val;
            },
            setSearchLastname : function(_val){
                return self.search.lastname = _val;
            },
            setSearchPhone : function(_val){
                return self.search.phone = _val;
            },
            setSearchZip : function(_val){
                return self.search.zip = _val;
            },
            setSearchCity : function(_val){
                return self.search.city = _val;
            },
            setBrochureType : function(_val){
                return self.lead.type.brochureType = _val;
            }

        }
    });

}());