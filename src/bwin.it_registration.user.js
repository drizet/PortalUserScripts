// ==UserScript==
// @name        BWI and GD registration
// @namespace   BWI and GD registration
// @description prefill registration form on BWI and GD
// @include     *www.bwin.it/*/registration*
// @include     *giocodigitale.it/*/registration*
// @version     5.7.2
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/kapetan/jquery-observe/master/jquery-observe.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/random.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(function () {
    if ($("#registration-form").length) {
        // Personal data
        $("#Input_NameData_FirstName").val(Random.getText(10));
        $("#Input_NameData_LastName").val(Random.getText(10));

        // Birth data
        $("#Input_BirthData_BirthCountry").selectOptionByValue("IT");
        $("#Input_BirthData_BirthState").selectOptionByValue("AG");
        $("#Input_BirthData_BirthCity").observe("childlist", "option[value='AGRIGENTO']", function () {
            setTimeout(function () {
                $("#Input_BirthData_BirthCity").selectOptionByValue("AGRIGENTO");
                $("#Input_BirthData_BirthCity").disconnect();
                $("#ConfirmCodiceFiscale #Input_BirthData_FiscalCodeConfirmed").check();
            }, 100);
        });

        // Selects
        $("#Input_AddressData_AddressState, #Input_SecurityData_SecurityQuestion, #Input_IdentificationData_DocumentType, #Input_IdentificationData_DocumentReleasedBy").selectOptionByIndex(1);

        // Set password
        $("#Input_LoginData_Password, #Input_LoginData_PasswordConfirmation, #Input_SecurityData_SecurityAnswer").val("123123qq");

        $("#Input_AddressData_AddressLine1").val("address");
        $("#Input_AddressData_AddressLine2").val("address2");
        $("#Input_AddressData_AddressZip").val("12312");
        $("#Input_AddressData_AddressCity").val("cityName");
        $("#Input_ContactData_EmailAddress").val(Random.getEmail(8, "yopmail.com"));
        $("#Input_ContactData_PhoneNumber").val("1231231");

        // Set date
        $("#Input_BirthData_DateOfBirth").setDate(1, 1, 1992);
        $("#Input_IdentificationData_DocumentReleaseDate").setDate(1, 1, 1992);

        // Account data
        $("#Input_LoginData_Username").val(Random.getUserName(4));

        // Mobile number
        $("#Input_ContactData_MobileCountryCode").selectOptionByValue("39");
        $("#Input_ContactData_MobileNumber").val("3471234567");
        
        // ID document
        $("#Input_IdentificationData_DocumentNumber").val("documentNumber");
        $("#Input_IdentificationData_DocumentReleaseLocation").val("releaseLocation");

        $("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted").check();
        $("#Captcha_Input_Answer").val("+++");
    }
});