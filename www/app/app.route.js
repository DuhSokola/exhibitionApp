;(function () {
    'use strict';

    var deps = [
        'app.login'
    ];

    var app = angular.module('app.route', deps);

    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/views/login/_login.html',
            controller: 'LoginCtrl'
        });

        /*$stateProvider.state('selectModel', {
            url: '/selectModel',
            templateUrl: 'templates/main/selectModel.html',
            controller: 'SelectModelCtrl'
        });

        $stateProvider.state('selectCountry', {
            url: '/selectCountry',
            templateUrl: 'templates/main/selectCountry.html',
            controller: 'SelectCountryCtrl'
        });

        $stateProvider.state('searchCustomer', {
            url: '/searchCustomer',
            templateUrl: 'templates/main/searchCustomer.html',
            controller: 'SearchCustomerCtrl'
        });

        $stateProvider.state('form', {
            url: '/form',
            templateUrl: 'templates/main/form.html',
            controller: 'FormCtrl'
        });*/

        // Each tab has its own nav history stack:

        /*.state('tab.dash', {
         url: '/dash',
         views: {
         'tab-dash': {
         templateUrl: 'templates/main/tab-dash.html',
         controller: 'DashCtrl'
         }
         }
         })*/
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });


}());