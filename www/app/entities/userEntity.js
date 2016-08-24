;(function () {
    'use strict';

    var dependencies = [];

    var app = angular.module('app.userEntity', dependencies);

    app.factory('UserEntity', function () {
        var self = this;

        self.user = {};
        self.user.brand = '';
        self.user.language = '';
        self.user.campaign = '';
        self.user.person = '';

        return {
            getBrand: function () {
                return self.user.brand;
            },
            setBrand: function (_brand) {
                self.user.brand = _brand;
            },

            getLanguage: function () {
                return self.user.language;
            },
            setLanguage: function (_language) {
                self.user.language = _language;
            },

            getCampaign: function () {
                return self.user.campaign;
            },
            setCampaign: function (_campaign) {
                self.user.campaign = _campaign;
            },

            getPerson: function () {
                return self.user.person;
            },
            setPerson: function (_person) {
                self.user.person = _person;
            },

            getUser: function () {
                return self.user;
            },
            setUser: function (_user) {
                self.user = _user
            }
        }
    });

}());