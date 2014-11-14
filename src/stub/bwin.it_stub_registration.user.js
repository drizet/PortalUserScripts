// ==UserScript==
// @name        bwin.it Registration for Stub server
// @namespace   bwin.it registration
// @description prefill registration form
// @version     0.8.0
// @include     *www.bwin.it/*/registration*
// @include     *giocodigitale.it/*/registration*
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/kapetan/jquery-observe/master/jquery-observe.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/random.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/stub/codeFiscaleGenerator.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/stub/core.js
// ==/UserScript==

var domains = [
    {
        text: "Bwin",
        id: "4",
        value: "BWINIT"
    },
    {
        text: "Gioco",
        id: "1",
        value: "GIOCOD"
    }
];

var statuses = [
    {
        value: 1024,
        text: "OK"
    },
    {
        value: 1025,
        text: "KO"
    },
    {
        value: 1026,
        text: "Request still being processed"
    },
    {
        value: 1200,
        text: "KO player has still an open account"
    },
    {
        value: 1201,
        text: "KO account code already registered"
    },
    {
        value: 1232,
        text: "KO province of residence in invalid"
    },
    {
        value: 1300,
        text: "KO person not found"
    },
    {
        value: 1301,
        text: "KO person deceased"
    },
    {
        value: 1302,
        text: "KO under 18"
    },
    {
        value: 1303,
        text: "KO invalid personal data"
    },
    {
        value: 1304,
        text: "KO invalid fiscal code"
    }
];

function createList(id, list) {
    var select = $('<select id="' + id + '"/>');
    for (var i = 0; i < list.length; i++) {
        $("<option />", { value: list[i].value, text: list[i].text }).appendTo(select);
    }

    return select;
}

// Create main container
var mainDiv = $('<div>')
    .css({
        position: "absolute",
        top: "0",
        left: "0",
        width: "max-content",
        height: "max-content",
        background: "white",
        display: "block",
        padding: "10px 10px 10px 10px"
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
button.click(function () {
    function getDomain() {
        var domainValue = $("#domainList").val();
        for (var i = 0; i < domains.length; i++) {
            if (domains[i].value == domainValue) {
                return domains[i];
            }
        }

        return null;
    }

    var settings = {
        domain : getDomain(),
        registrationId : $("#statusList").val(),
        subRegistrationId : $("#subStatusList").val()
    };

    var generator = new CodeFiscaleGenerator(settings);
    generator.generageCodefiscale()
        .then(function (codeFiscale) {
            $("#Input_BirthData_FiscalCode").val(codeFiscale);
            $("#ConfirmCodiceFiscale #Input_BirthData_FiscalCodeConfirmed").check();
        }, function (response) {
            if (response != null) {
                alert("Error!\nStatus: " + response.status + "\nText: " + response.responseText);
            }
    });
});

$(function () {
    if ($("#registration-form").length) {
        var userId = Random.getUserName(4);

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
        $("#Input_LoginData_Username").val(userId);

        // ID document
        $("#Input_IdentificationData_DocumentNumber").val("documentNumber");
        $("#Input_IdentificationData_DocumentReleaseLocation").val("releaseLocation");

        $("#Input_TermsAndConditions_TacAcceptance, #Input_PrivacyPolicy_PrivacyPolicyAccepted").check();
        $("#Captcha_Input_Answer").val("+++");
    }
});