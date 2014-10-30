// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        bwin.fr registration
// @namespace   bwin.fr registration
// @description prefill registration form
// @include     *www.bwin.fr/*/registration*
// @version     3
// @grant       none
// ==/UserScript==

$("#Input_NameData_FirstName").val(getRandomText("firstName", false, 5));
$("#Input_NameData_LastName").val(getRandomText("lastName", false, 5));
$("#Input_AddressData_AddressCountryCode").val("FR");
$("#Input_BirthData_BirthCountry").val("BR");
$("#birthcity_text #Input_BirthData_BirthCity").val("123");
$("#Input_AddressData_AddressCity").val("cityName");
$("#Input_AddressData_AddressZip").val("12312");
$("#Input_AddressData_AddressLine1").val("address");
$("#Input_AddressData_AddressLine2").val("address2");
$("#Input_BirthData_DateOfBirth_Day").val("1");
$("#Input_BirthData_DateOfBirth_Month").val("1");
$("#Input_BirthData_DateOfBirth_Year").val("1992");
$("#Input_BirthData_DateOfBirth").attr("value", "1/1/1992")
$("#Input_ContactData_EmailAddress").val(getEmail(8, "bwin.fr"));
$("#Input_ContactData_PhoneNumber").val("1231231");
$("#Input_LoginData_Username").val(getRandomText("test", 4));
$("#Input_LoginData_Password").val("123123q");
$("#Input_LoginData_PasswordConfirmation").val("123123q");
$("#Input_SecurityData_SecurityQuestion").val(17);
$("#Input_SecurityData_SecurityAnswer").val("123123q");
$("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted").attr("checked", "checked");
$("#Captcha_Input_Answer").val("+++");

function getEmail(symbolsCount, domain)
{
    return getRandomText(null, true, symbolsCount) + "@" + domain;
}

function getRandomText(prefix, hasNumbers, symbolsCount)
{
    if(symbolsCount == null)
        symbolsCount = 5;
    
    var text = "";
    var symbols = "abcdefghijklmnopqrstuvwxyz";
    
    if(hasNumbers)
    {
       symbols += "0123456789"
    }
    
    for( var i=0; i < symbolsCount; i++ )
        text += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    if(prefix == null)
    {
       prefix = "";
    }
    
    return prefix + text;
}