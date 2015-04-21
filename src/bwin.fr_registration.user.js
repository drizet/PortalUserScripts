// ==UserScript==
// @name        bwin.fr registration
// @namespace   bwin.fr registration
// @description prefill registration form
// @include     *www.bwin.fr/*/registration*
// @version     3.1.4
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/kapetan/jquery-observe/master/jquery-observe.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(document).ready(function () {
    $("#Input_NameData_FirstName").val(getRandomText("firstName", false, 5));
    $("#Input_NameData_LastName").val(getRandomText("lastName", false, 5));
    $("#Input_AddressData_AddressCountryCode").val("FR");
    $("#Input_BirthData_BirthCountry").selectOptionByValue("FR");
    if ($('#Input_BirthData_BirthState').children('option').length > 1) {
        $("#Input_BirthData_BirthState").selectOptionByIndex(1);
    }
    else {
        $("#Input_BirthData_BirthState").observe("childlist", function () {
            $("#Input_BirthData_BirthState").selectOptionByIndex(1);
            $("#Input_BirthData_BirthState").disconnect();
        });
    }

    $("#birthcity_text").val("123");
    $("#Input_BirthData_BirthCity").observe("childlist", function () {
        $("#Input_BirthData_BirthCity").selectOptionByIndex(1);
        $("#Input_BirthData_BirthCity").disconnect();
    });

    $("#Input_BirthData_BirthCity").selectOptionByIndex(1);
    $("#Input_AddressData_AddressCity").val("cityName");
    $("#Input_AddressData_AddressZip").val("12312");
    $("#Input_AddressData_AddressLine1").val("address");
    $("#Input_AddressData_AddressLine2").val("address2");
    $("#Input_BirthData_DateOfBirth").setDate(1, 1, 1992);
    $("#Input_ContactData_EmailAddress").val(getEmail(8, "yopmail.com"));
    $("#Input_ContactData_PhoneNumber").val("1231231");
    $("#Input_LoginData_Username").val(getRandomText("test", 4));
    $("#Input_LoginData_Password").val("123123qq");
    $("#Input_LoginData_PasswordConfirmation").val("123123qq");
    $("#Input_SecurityData_SecurityQuestion").selectOptionByValue(17);
    $("#Input_SecurityData_SecurityAnswer").val("123123qq");
    $("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted, #Input_BonusData_BonusTacAccepted").check();
    $("#Captcha_Input_Answer").val("+++");
});

function getEmail(symbolsCount, domain) {
    return getRandomText(null, true, symbolsCount) + "@" + domain;
}

function getRandomText(prefix, hasNumbers, symbolsCount) {
    if (symbolsCount == null)
        symbolsCount = 5;

    var text = "";
    var symbols = "abcdefghijklmnopqrstuvwxyz";

    if (hasNumbers) {
        symbols += "0123456789"
    }

    for (var i = 0; i < symbolsCount; i++)
        text += symbols.charAt(Math.floor(Math.random() * symbols.length));

    if (prefix == null) {
        prefix = "";
    }

    return prefix + text;
}