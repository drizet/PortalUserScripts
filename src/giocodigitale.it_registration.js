// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        giocodigitale.it registration
// @namespace   giocodigitale.it registration
// @description prefill registration form
// @include     *giocodigitale.it/*/registration
// @version     1
// @grant       none
// ==/UserScript==

// Personal data
$("#Input_NameData_FirstName").val(getRandomText(null, false, 10));
$("#Input_NameData_LastName").val(getRandomText(null, false, 10));
// Date Of Birth
$("#Input_BirthData_DateOfBirth_Day").val("1");
$("#Input_BirthData_DateOfBirth_Month").val("1");
$("#Input_BirthData_DateOfBirth_Year").val("1992");
$("#Input_BirthData_DateOfBirth").attr("value", "1/1/1992");
// Birth data
$("#Input_BirthData_BirthCountry").val("IT");
setTimeout(function(){
    $("#Input_BirthData_BirthProvince").val("AG").click();
}, 3000);
setTimeout(function(){
    $("#Input_BirthData_BirthCity").val("A089").click();
    $("#ConfirmCodiceFiscale #Input_BirthData_FiscalCodeConfirmed").attr("checked", "checked").click();
}, 4500);

$("#Input_AddressData_AddressState").val("AG");
$("#Input_AddressData_AddressLine1").val("address");
$("#Input_AddressData_AddressLine2").val("address2");
$("#Input_AddressData_AddressZip").val("12312");
$("#Input_AddressData_AddressCity").val("cityName");
$("#Input_ContactData_EmailAddress").val(getEmail(8, "bwin.it"));
$("#Input_ContactData_PhoneNumber").val("1231231");

// Account data
$("#Input_LoginData_Username").val(getRandomText("test", 4));
$("#Input_LoginData_Password").val("123123q");
$("#Input_LoginData_PasswordConfirmation").val("123123q");
$("#Input_SecurityData_SecurityQuestion").val(4);
$("#Input_SecurityData_SecurityAnswer").val("123123q");

// ID document
$("#Input_IdentificationData_DocumentType").val(1);
$("#Input_IdentificationData_DocumentNumber").val("documentNumber");
// Release Date
$("#Input_IdentificationData_DocumentReleaseDate_Day").val("1");
$("#Input_IdentificationData_DocumentReleaseDate_Month").val("1");
$("#Input_IdentificationData_DocumentReleaseDate_Year").val("1992");
$("#Input_IdentificationData_DocumentReleaseDate").attr("value", "1/1/1992");
$("#Input_IdentificationData_DocumentReleasedBy").val("1");
$("#Input_IdentificationData_DocumentReleaseLocation").val("releaseLocation");

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
    
    for( var i = 0; i < symbolsCount; i++ )
        text += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    if(prefix == null)
    {
       prefix = "";
    }
    
    return prefix + text;
}