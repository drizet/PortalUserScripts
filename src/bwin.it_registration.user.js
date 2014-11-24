// ==UserScript==
// @name        BWI and GD registration
// @namespace   BWI and GD registration
// @description prefill registration form on BWI and GD
// @include     *www.bwin.it/*/registration*
// @include     *giocodigitale.it/*/registration*
// @version     5.5.0
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
        $("#Input_BirthData_BirthCity").observe("added", function () {
            $("#Input_BirthData_BirthCity").selectOptionByValue("AGRIGENTO");
            $("#Input_BirthData_BirthCity").disconnect();
        });

        // Selects
        $("#Input_AddressData_AddressState, #Input_SecurityData_SecurityQuestion, #Input_IdentificationData_DocumentType, #Input_IdentificationData_DocumentReleasedBy").selectOptionByIndex(1);

        // Set password
        $("#Input_LoginData_Password, #Input_LoginData_PasswordConfirmation, #Input_SecurityData_SecurityAnswer").val("123123q");

        $("#Input_AddressData_AddressLine1").val("address");
        $("#Input_AddressData_AddressLine2").val("address2");
        $("#Input_AddressData_AddressZip").val("12312");
        $("#Input_AddressData_AddressCity").val("cityName");
        $("#Input_ContactData_EmailAddress").val(Random.getEmail(8, "bwin.it"));
        $("#Input_ContactData_PhoneNumber").val("1231231");

        // Set date
        $("#Input_BirthData_DateOfBirth, #Input_IdentificationData_DocumentReleaseDate").setDate(1, 1, 1992);

        // Account data
        $("#Input_LoginData_Username").val(Random.getUserName(4));

        // ID document
        $("#Input_IdentificationData_DocumentNumber").val("documentNumber");
        $("#Input_IdentificationData_DocumentReleaseLocation").val("releaseLocation");

        $("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted").check();
        $("#Captcha_Input_Answer").val("+++");
    }
});