// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var deps = [
    'ionic',
    'app.route',
    'pascalprecht.translate',
    'carData',
    'accessoryData',
    'app.leadResource'
];

angular.module('starter', deps)

    .run(function ($ionicPlatform, $rootScope, CarDataService, AccessoryDataService, $interval, LeadResourceService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.cordova && window.cordova.logger) {
                window.cordova.logger.__onDeviceReady();
            }
        });

        $rootScope.appVersion = '1.0';
        CarDataService.initCarData();
        AccessoryDataService.initAccessoryData();

        $interval(function(){
            LeadResourceService.resendFailedLeads();
            console.log('Resend Failed Leads');
        }, 1000*10*60*5);

    })

    .config(function ($translateProvider) {
        /**
         * Translations
         */
        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('de');

    });

    