;(function () {
    'use strict';

    var deps = [
        'app.login',
        'app.selectModel',
        'app.selectCountry',
        'app.searchCustomer',
        'app.customerForm'
    ];

    var app = angular.module('app.route', deps);

    app.config(function ($stateProvider, $urlRouterProvider) {

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/views/login/_login.html',
            controller: 'LoginCtrl'
        });

        $stateProvider.state('selectModel', {
            url: '/selectModel',
            templateUrl: 'app/views/selectModel/_selectModel.html',
            controller: 'SelectModelCtrl'
        });

        $stateProvider.state('selectCountry', {
            url: '/selectCountry',
            templateUrl: 'app/views/selectCountry/_selectCountry.html',
            controller: 'SelectCountryCtrl'
        });

        $stateProvider.state('searchCustomer', {
            url: '/searchCustomer',
            templateUrl: 'app/views/searchCustomer/_searchCustomer.html',
            controller: 'SearchCustomerCtrl',
            cache: false
        });

        $stateProvider.state('customerForm', {
            url: '/customerForm',
            templateUrl: 'app/views/customerForm/_customerForm.html',
            controller: 'CustomerFormCtrl'
        });

    });


}());