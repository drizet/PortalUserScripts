// ==UserScript==
// @name        bwin.it Registration for Stub server
// @namespace   bwin.it registration
// @description prefill registration form
// @include     *www.bwin.it/*/registration*
// @include     *giocodigitale.it/*/registration*
// @version     0.4.1
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://github.com/drizet/PortalUserScripts/raw/master/src/app/codeFiscaleGenerator.js
// ==/UserScript==
var createCodeFiscaleLink = "https://213.92.84.21:8843/pgad-accounting-protocol-stub/service/rest/configure/addResponses/";
var getAllCodeFiscaleLink = "https://213.92.84.21:8843/pgad-accounting-protocol-stub/service/rest/configure/getConfiguredResponses/";

var domains = [
    {
        text : "Bwin",
        id : "4",
        value : "BWINIT"
    },
    {
        text : "Gioco",
        id : "1",
        value : "GIOCOD"
    }
];

var statuses = [
    {
        value : 1024,
        text : "OK"
    },
    {
        value : 1025,
        text : "KO"
    },
    {
        value : 1026,
        text : "Request still being processed"
    },
    {
        value : 1200,
        text : "KO player has still an open account"
    },
    {
        value : 1201,
        text : "KO account code already registered"
    },
    {
        value : 1232,
        text : "KO province of residence in invalid"
    },
    {
        value : 1300,
        text : "KO person not found"
    },
    {
        value : 1301,
        text : "KO person deceased"
    },
    {
        value : 1302,
        text : "KO under 18"
    },
    {
        value : 1303,
        text : "KO invalid personal data"
    },
    {
        value : 1304,
        text : "KO invalid fiscal code"
    }
];

function getRandomCharacter(){
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

function createList(id, list){
    var select = $('<select id="' + id + '"/>');
    for (var i = 0; i < list.length; i++) {
        $("<option />", { value : list[i].value, text : list[i].text }).appendTo(select);
    }

    return select;
}

// Create main container
var mainDiv = $('<div>')
    .css({
        position : "absolute",
        top : "0",
        left : "0",
        width : "max-content",
        height : "max-content",
        background : "white",
        display : "block",
        padding : "10px 10px 10px 10px"
    }).appendTo('div.container');

// Create domain list and text
mainDiv.append($("<div>").append("Domain: ").append("<br/>").append(createList("domainList", domains)));

// Create registration status list and text
mainDiv.append($("<div>").append("Registration status: ").append("<br/>").append(createList("statusList", statuses)));

// Create subregistration status status list
mainDiv.append($("<div>").append("Sub registration status: ").append("<br/>").append(createList("subStatusList", statuses)));

// Create generate button
var button = $("<button>Fill</button>");
mainDiv.append(button);

// Send request
function getDomain(){
    var domainValue = $("#domainList").val();
    for (var i = 0; i < domains.length; i++) {
        if (domains[i].value == domainValue) {
            return domains[i];
        }
    }

    return null;
}

function getEmail(symbolsCount, domain){
    return getRandomText(null, true, symbolsCount) + "@" + domain;
}

function getRandomText(prefix, hasNumbers, symbolsCount){
    if (symbolsCount == null) {
        symbolsCount = 5;
    }

    var text = "";
    var symbols = "abcdefghijklmnopqrstuvwxyz";

    if (hasNumbers) {
        symbols += "0123456789";
    }

    for (var i = 0; i < symbolsCount; i++) {
        text += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    if (prefix == null) {
        prefix = "";
    }

    return prefix + text;
}

var settings = {};
button.click(function () {
    settings.domain = getDomain();
    settings.registrationId = $("#statusList").val();
    settings.subRegistrationId = $("#subStatusList").val();
    var generator = new CodeFiscaleGenerator(settings);
    generator.generageCodefiscale()
        .then(function () {
            if ($("#registration-form").length) {
                var userId = getRandomText("test", 4);

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
                setTimeout(function () {
                    $("#Input_BirthData_BirthState").val("AG").click();
                }, 3000);
                setTimeout(function () {
                    $("#Input_BirthData_BirthCity").val("AGRIGENTO").click();
                    $("#ConfirmCodiceFiscale #Input_BirthData_FiscalCodeConfirmed").attr("checked", "checked").click();
                    $("#ConfirmCodiceFiscale #Input_BirthData_FiscalCodeConfirmed").parent().addClass("checked");
                    $("#Input_BirthData_CodiceFiscale").val(settings.codeFiscale);
                }, 4500);
                setTimeout(function () {
                    $("#Input_BirthData_CodiceFiscale").val(settings.codeFiscale);
                }, 5000);

                $("#Input_AddressData_AddressState").val("AG");
                $("#Input_AddressData_AddressLine1").val("address");
                $("#Input_AddressData_AddressLine2").val("address2");
                $("#Input_AddressData_AddressZip").val("12312");
                $("#Input_AddressData_AddressCity").val("cityName");
                $("#Input_ContactData_EmailAddress").val(getEmail(8, "bwin.it"));
                $("#Input_ContactData_PhoneNumber").val("1231231");

                // Account data
                $("#Input_LoginData_Username").val(userId);
                $("#Input_LoginData_Password").val("123123q");
                $("#Input_LoginData_PasswordConfirmation").val("123123q");
                $("#Input_SecurityData_SecurityQuestion").val(11);
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
                $("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted").parent().addClass("checked");
                $("#Captcha_Input_Answer").val("+++");
            }
        });
});
