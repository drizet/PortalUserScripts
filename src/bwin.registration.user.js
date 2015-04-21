// ==UserScript==
// @name        Bwin registration
// @namespace   Bwin registration
// @description Prefill registration form on for all bwin labels
// @include     *bwin.*/registration*
// @include     *gamebookers.com*/registration*
// @exclude     *bwin.it*
// @exclude     *bwin.fr*
// @version     0.3.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/random.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(function () {
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }


    if ($("#registration-form").length) {
        // Personal data
        $("#Input_NameData_FirstName").val(Random.getText(10));
        $("#Input_NameData_LastName").val(Random.getText(10));
        $("#Input_AddressData_AddressCountryCode").selectOptionByValue("GB");
        $("#Input_AddressData_AddressState").selectOptionByIndex(1);
        $("#Input_AddressData_AddressCity").val(Random.getText(6));
        $("#Input_AddressData_AddressZip").val("2" + Random.getNumbers(4));
        $("#Input_AddressData_AddressLine1").val("address");
        $("#Input_AddressData_AddressLine2").val("address2");

        $("#Input_CurrencyData_CurrencyCode").selectOptionByValue("EUR");
        $("#Input_BirthData_DateOfBirth").setDate(1, 1, 1992);
        $("#Input_ContactData_EmailAddress").val(Random.getEmail(8, "yopmail.com"));
        $("#Input_ContactData_PhoneNumber").val("1231231");

        // Account data
        $("#Input_LoginData_Username").val(Random.getUserName(4));
        $("#Input_LoginData_Password, #Input_LoginData_PasswordConfirmation, #Input_SecurityData_SecurityAnswer").val("123123qq");
        $("#Input_SecurityData_SecurityQuestion").selectOptionByIndex(1);

        // Confirmation
        $("#Input_TermsAndConditions_TacAcceptance, #Input_BonusData_BonusTacAccepted").check();
        $("#Captcha_Input_Answer").val("+++");

        // BE
        var nrnDate = "920101";
        var nrnSerialNumber = Random.getNumbers(3);
        var nrnChecksum = 97 - (parseInt(nrnDate + nrnSerialNumber) % 97);

        $("#Input_IdentificationData_NRNDate").val(nrnDate);
        $("#Input_IdentificationData_NRNSerialNumber").val(nrnSerialNumber);
        $("#Input_IdentificationData_NRNChecksum").val(pad(nrnChecksum, 2));
        $("#Input_IdentificationData_Profession").selectOptionByIndex(1);
        $("#Input_IdentificationData_CityOfBirth").val(Random.getText(6));

        // ES
        var dni = Random.getNumbers(8);

        var characters = "TRWAGMYFPDXBNJZSQVHLCKE";

        dni = dni + characters[parseInt(dni) % 23];

        $("#Input_NameData_SecondLastName").val(Random.getText(10));
        $("#Input_NieNif_IdDocumentNumber").val(dni);
    }
});