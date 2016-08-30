;(function () {
    'use strict';

    var dependencies = [
        'app.leadEntity',
        'app.userEntity',
        'app.selectItem.directive',
        'ngSanitize',
        'iso-3166-country-codes',
        'app.localStorage',
        'app.leadResource'
    ];

    var app = angular.module('app.customerForm.ctrl', dependencies);

    app.controller('CustomerFormCtrl', ['$scope', '$state', 'LeadEntity', 'UserEntity', 'ISO3166', 'LocalStorageService', 'LeadResourceService', '$translate', '$timeout', function ($scope, $state, LeadEntity, UserEntity, ISO3166, LocalStorageService, LeadResourceService, $translate, $timeout) {

        $scope.data = {};
        var initData = function () {
            $scope.data.catalogTyp = LeadEntity.getLeadType().brochureType; //validation
            $scope.data.salutation = LeadEntity.getCustomer().salutation; //validation
            $scope.data.firstname = LeadEntity.getCustomer().firstname; //validation
            $scope.data.lastname = LeadEntity.getCustomer().lastname; //validation
            $scope.data.firm = LeadEntity.getCustomer().firm;
            $scope.data.street = LeadEntity.getCustomer().street; //validation
            $scope.data.streetNr = LeadEntity.getCustomer().houseNumber; //validation
            $scope.data.zip = LeadEntity.getCustomer().zip; //validation
            $scope.data.city = LeadEntity.getCustomer().city; //validation
            $scope.data.phone = LeadEntity.getCustomer().phone.replace('*', '');//validation
            $scope.data.email = LeadEntity.getCustomer().email; //validation
            if (LeadEntity.getCustomer().country === 'ch') {
                $scope.data.country = ISO3166.codeToCountry[LeadEntity.getCustomer().country.toUpperCase()];
            } else {
                if (LeadEntity.getCustomer().country === 'nonch') {
                    $scope.data.country = '';
                } else {
                    $scope.data.country = ISO3166.codeToCountry[LeadEntity.getCustomer().country.toUpperCase()]
                }
            }
            $scope.data.countryCode = LeadEntity.getCustomer().country;
            $scope.data.dealer = LeadEntity.getCustomer().dealer;
            $scope.data.remarks = LeadEntity.getCustomer().remarks;
            $scope.data.privacy = LeadEntity.getCustomer().privacy; //validation
            $scope.data.newsletter = LeadEntity.getCustomer().newsletter;
        };
        initData();

        $scope.ui = {};
        $scope.ui.campaign = UserEntity.getCampaign();
        $scope.ui.brand = UserEntity.getBrand();
        $scope.ui.person = UserEntity.getPerson();
        $scope.ui.countryList = ISO3166.codeToCountry;
        $scope.ui.mode = LeadEntity.getCustomer().mode;
        $scope.ui.leadCarList = LeadEntity.getOrder().cars;
        $scope.ui.leadAccessoryList = LeadEntity.getOrder().accessories;
        $scope.ui.language = $translate.use();
        $scope.ui.corLanguage = LeadEntity.getCustomer().language;
        $scope.ui.testdrive = LeadEntity.getLeadType().testdrive;
        $scope.ui.brochure = LeadEntity.getLeadType().brochure;
        $scope.ui.offer = LeadEntity.getLeadType().offer;

        $scope.ui.dealerSearch = {};
        $scope.ui.dealerSearch.name = '';
        $scope.ui.dealerSearch.city = '';
        $scope.ui.dealerSearch.zip = '';

        $scope.ui.brand = 'vw';
        $scope.ui.dealerList = LocalStorageService.getDealerListByBrand($scope.ui.brand);

        $scope.submitLead = function () {
            if (formIsValid()) {
                LeadResourceService.save();
                $scope.startValidation = false;
            } else {
                $('#popup_validation_error').addClass('active');
                $timeout(function () {
                    $('#popup_validation_error').removeClass('active');
                }, 800);
            }
        };

        $scope.selectDealer = function (dealer) {
            $scope.data.dealer = dealer;
            $('#popup_dealerSearch').removeClass('active');
        };

        $scope.removeDealer = function () {
            $scope.data.dealer = '';
            $('#popup_dealerSearch').removeClass('active');
        };

        var persistIntoLeadEntity = function () {
            LeadEntity.setBrand(UserEntity.getBrand());
            LeadEntity.setCustomerSalutation($scope.data.salutation);
            LeadEntity.setCustomerFirstname($scope.data.firstname);
            LeadEntity.setCustomerLastname($scope.data.lastname);
            LeadEntity.setCustomerFirm($scope.data.firm);
            LeadEntity.setCustomerStreet($scope.data.street);
            LeadEntity.setCustomerHouseNumber($scope.data.streetNr);
            LeadEntity.setCustomerZip($scope.data.zip);
            LeadEntity.setCustomerCity($scope.data.city);
            LeadEntity.setCustomerCountry($scope.data.countryCode);
            LeadEntity.setCustomerPhone($scope.data.phone);
            LeadEntity.setCustomerEmail($scope.data.email);
            LeadEntity.setCustomerDealer($scope.data.dealer);
            LeadEntity.setCustomerRemarks($scope.data.remarks);
            LeadEntity.setCustomerNewsletter($scope.data.newsletter);
            LeadEntity.setCustomerPrivacy($scope.data.privacy);
            LeadEntity.setBrochureType($scope.data.catalogTyp);
        };

        $scope.$watch('data.country', function (newVal) {
            if (newVal) {
                if (newVal.length > 2) {
                    $scope.data.countryCode = ISO3166.countryToCode[newVal].toLowerCase();
                }
            }
        });

        $scope.$watch('data', function () {
            persistIntoLeadEntity();
            if ($scope.startValidation === true) {
                formIsValid();
            }
        }, true);

        var formIsValid = function () {
            $scope.startValidation = true;

            var scope = $scope.data;
            var formIsValid = true;

            //catalog validation
            var printedCatalogEl = $('#radioElectronic .item-content');
            var electroCatalogEl = $('#radioPrinted .item-content');
            if ($scope.ui.brochure == true) {
                if (scope.catalogTyp === undefined || scope.catalogTyp === '') {
                    printedCatalogEl.addClass('not-valid');
                    electroCatalogEl.addClass('not-valid');
                    formIsValid = false;
                } else {
                    printedCatalogEl.removeClass('not-valid');
                    electroCatalogEl.removeClass('not-valid');
                }
            }

            //salutation validation
            var maleSalutationEl = $('#salutationM .item-content');
            var femaleSalutationEl = $('#salutationF .item-content');
            if (scope.salutation === undefined || scope.salutation === '') {
                maleSalutationEl.addClass('not-valid');
                femaleSalutationEl.addClass('not-valid');
                formIsValid = false;
            } else {
                maleSalutationEl.removeClass('not-valid');
                femaleSalutationEl.removeClass('not-valid');
            }

            //firstname validation
            var firstnameEl = $('#firstname');
            if (scope.firstname === undefined || scope.firstname === '') {
                firstnameEl.addClass('not-valid');
                formIsValid = false;
            } else {
                firstnameEl.removeClass('not-valid');
            }

            //lastname validation
            var lastnameEl = $('#lastname');
            if (scope.lastname === undefined || scope.lastname === '') {
                lastnameEl.addClass('not-valid');
                formIsValid = false;
            } else {
                lastnameEl.removeClass('not-valid');
            }

            //street validation
            var streetEl = $('#street');
            if (scope.street === undefined || scope.street === '') {
                streetEl.addClass('not-valid');
                formIsValid = false;
            } else {
                streetEl.removeClass('not-valid');
            }

            //streetNr validation
            var streetNrEl = $('#streetNr');
            if (scope.streetNr === undefined || scope.streetNr === '') {
                streetNrEl.addClass('not-valid');
                formIsValid = false;
            } else {
                streetNrEl.removeClass('not-valid');
            }

            //zip validation
            var zipEl = $('#zip');
            if (scope.zip === undefined || scope.zip === '') {
                zipEl.addClass('not-valid');
                formIsValid = false;
            } else if ($scope.ui.mode === 'swiss') {
                if (scope.zip.length != 4) {
                    zipEl.addClass('not-valid');
                    formIsValid = false;
                } else {
                    zipEl.removeClass('not-valid');
                }
            } else {
                zipEl.removeClass('not-valid');
            }

            //city validation
            var cityEl = $('#city');
            if (scope.city === undefined || scope.city === '') {
                cityEl.addClass('not-valid');
                formIsValid = false;
            } else {
                cityEl.removeClass('not-valid');
            }

            //phone validation
            var phoneEl = $('#phone');
            if ($scope.ui.testdrive == true || $scope.ui.offer == true) {
                if (scope.phone === undefined || scope.phone === '') {
                    phoneEl.addClass('not-valid');
                    formIsValid = false;
                } else if ($scope.ui.mode === 'swiss') {
                    var swissPhonePatter = new RegExp(/(0|\+41)(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/);
                    if (!swissPhonePatter.test(scope.phone)) {
                        phoneEl.addClass('not-valid');
                        formIsValid = false;
                    } else {
                        phoneEl.removeClass('not-valid');
                    }
                } else {
                    phoneEl.removeClass('not-valid');
                }
            } else {
                phoneEl.removeClass('not-valid');
            }

            //email validation
            var emailEl = $('#email');
            var emailPatter = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

            if ($scope.ui.brochure == true || $scope.data.newsletter == true) {
                if (scope.catalogTyp === 'electronic' || $scope.data.newsletter == true) {
                    if (scope.email === undefined || scope.email === '') {
                        emailEl.addClass('not-valid');
                        formIsValid = false;
                    } else {
                        if (!emailPatter.test(scope.email)) {
                            emailEl.addClass('not-valid');
                            formIsValid = false;
                        } else {
                            emailEl.removeClass('not-valid');
                        }
                    }
                } else {
                    if (scope.email != undefined && scope.email != '') {
                        if (!emailPatter.test(scope.email)) {
                            emailEl.addClass('not-valid');
                            formIsValid = false;
                        } else {
                            emailEl.removeClass('not-valid');
                        }
                    } else {
                        emailEl.removeClass('not-valid');
                    }
                }
            } else {
                if (scope.email != undefined && scope.email != '') {
                    if (!emailPatter.test(scope.email)) {
                        emailEl.addClass('not-valid');
                        formIsValid = false;
                    } else {
                        emailEl.removeClass('not-valid');
                    }
                } else {
                    emailEl.removeClass('not-valid');
                }
            }

            //country validation
            var countryEl = $('#country');
            console.log(scope.countryCode);
            if (scope.countryCode === undefined || scope.countryCode === '' || scope.countryCode === 'nonch') {
                countryEl.addClass('not-valid');
                formIsValid = false;
            } else {
                countryEl.removeClass('not-valid');
            }

            //privacy validation
            var privacyLblEl = $('#privacyLabel');
            if (scope.privacy != true) {
                privacyLblEl.css('color', 'red');
                formIsValid = false;
            } else {
                privacyLblEl.css('color', 'black');
            }

            return formIsValid;
        };

        $scope.$watch('data.catalogTyp', function (newVal) {
            var electroElem = $('.catalogTyp .radios label[id="radioElectronic"] .item-content');
            var printedElem = $('.catalogTyp .radios label[id="radioPrinted"] .item-content');
            if (newVal === 'electronic') {
                electroElem.addClass('selected');
                printedElem.removeClass('selected');
            } else if (newVal === 'printed') {
                printedElem.addClass('selected');
                electroElem.removeClass('selected');
            } else if (newVal === undefined) {
                electroElem.removeClass('selected');
                printedElem.removeClass('selected');
            }
        });

        $scope.$watch('data.salutation', function (newVal) {
            var salutationMElem = $('.salutation .radios label[id="salutationM"] .item-content');
            var salutationFElem = $('.salutation .radios label[id="salutationF"] .item-content');
            if (newVal === 'm') {
                salutationMElem.addClass('selected');
                salutationFElem.removeClass('selected');
            } else if (newVal === 'f') {
                salutationFElem.addClass('selected');
                salutationMElem.removeClass('selected');
            }
        });

        $scope.$on('leadSendSuccess', function () {
            console.log('SUCCESS');
            $('#popup_leadsend_success').addClass('active');
            $timeout(function () {
                $('#popup_leadsend_success').removeClass('active');
                LeadEntity.resetAll();
                $state.go('selectModel')
            }, 1200);
        });

        $scope.$on('leadSendError', function () {
            console.log('ERROR');
            $('#popup_leadsend_error').addClass('active');
            $timeout(function () {
                $('#popup_leadsend_error').removeClass('active');
                LeadEntity.resetAll();
                $state.go('selectModel')
            }, 1200);
        });

        $scope.resetForm = function () {
            $scope.data.catalogTyp = ''; //validation
            $scope.data.salutation = ''; //validation
            $scope.data.firstname = ''; //validation
            $scope.data.lastname = ''; //validation
            $scope.data.firm = '';
            $scope.data.street = ''; //validation
            $scope.data.streetNr = ''; //validation
            $scope.data.zip = ''; //validation
            $scope.data.city = ''; //validation
            $scope.data.phone = '';//validation
            $scope.data.email = ''; //validation
            $scope.data.country = ((LeadEntity.getCustomer().country == 'ch') ? ISO3166.codeToCountry[LeadEntity.getCustomer().country.toUpperCase()] : ''); //validation
            $scope.data.countryCode = LeadEntity.getCustomer().country;
            $scope.data.dealer = '';
            $scope.data.remarks = '';
            $scope.data.privacy = false; //validation
            $scope.data.newsletter = false;
            $('.catalogTyp .radios label[id="radioElectronic"] .item-content').removeClass('selected');
            $('.catalogTyp .radios label[id="radioPrinted"] .item-content').removeClass('selected');

            $('.salutation .radios label[id="salutationM"] .item-content').removeClass('selected');
            $('.salutation .radios label[id="salutationF"] .item-content').removeClass('selected');
        };

        $scope.goBack = function () {
            $state.go('selectModel', {mode: 'adjustSelection'});
        };

        $scope.goToSearch = function () {
            $state.go('searchCustomer');
        };

        $scope.goToSwissLead = function () {
            LeadEntity.setMode('swiss');
            $state.go('searchCustomer');
        };

        $scope.goToHomePage = function () {
            $state.go('login');
        };

        $("#zip").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $("#phone").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

    }]);

}());