// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        www.sh.bwin.de registration
// @namespace   www.sh.bwin.de registration
// @description prefill registration form
// @include     *www.sh.bwin.de/*/registration
// @version     2
// @grant       GM_setClipboard
// ==/UserScript==

if($("#registration-form").length){
	var userId = getRandomText("test", 4);
	
	// Personal data
	$("#Input_NameData_FirstName").val(getRandomText(null, false, 10));
	$("#Input_NameData_LastName").val(getRandomText(null, false, 10));
	$("#Input_NameData_MaidenName").val(getRandomText(null, false, 10));
	
	// Date Of Birth
	$("#Input_BirthData_DateOfBirth_Day").val("1");
	$("#Input_BirthData_DateOfBirth_Month").val("1");
	$("#Input_BirthData_DateOfBirth_Year").val("1992");
	$("#Input_BirthData_DateOfBirth").attr("value", "1/1/1992");

	$("#Input_AddressData_AddressLine1").val("address");
	$("#Input_AddressData_AddressLine2").val("address2");
	$("#Input_AddressData_AddressZip").val("12312");
	$("#Input_AddressData_AddressCity").val("cityName");
	$("#Input_ContactData_EmailAddress").val(getEmail(userId, "shbwin.de"));
	$("#Input_ContactData_PhoneNumber").val("1231231");

	// Account data
	$("#Input_LoginData_Username").val(userId);
	$("#Input_LoginData_Password").val("123123q");
	$("#Input_LoginData_PasswordConfirmation").val("123123q");
	$("#Input_SecurityData_SecurityQuestion").val(4);
	$("#Input_SecurityData_SecurityAnswer").val("123123q");

	$("#Input_TermsAndConditions_TacAcceptance").attr("checked", "checked").parent().addClass("checked");
	$("#Captcha_Input_Answer").val("+++");

	GM_setClipboard(userId, "text");
}

function getEmail(symbolsCount, domain) {
    if(typeof symbolsCount === 'string') {
        return symbolsCount + "@" + domain;
    }
    
    return getRandomText(null, true, symbolsCount) + "@" + domain;
}

function getRandomText(prefix, hasNumbers, symbolsCount) {
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