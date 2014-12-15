function UI() { }

UI.createInterface = function (successCallback){
    var domain;
    if (window.location.host.indexOf('www.bwin.it') !== -1) {
        domain = {
            text : "Bwin",
            id : "4",
            value : "BWINIT"
        };
    }
    else {
        domain = {
            text : "Gioco",
            id : "1",
            value : "GIOCOD"
        };
    }

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

    function addRow(text, element) {
        return mainDiv.append($("<div>").append(text).append("<br/>").append(element));
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

    mainDiv.append($("<h3>").append("SSN Registrator"));
    // Create registration status list and text
    addRow("Registration status: ", createList("statusList", statuses));
    // Create subregistration status status list
    addRow("Sub registration status: ", createList("subStatusList", statuses));

    // Create generate button
    var registerButton = $("<button>Register</button>");
    mainDiv.append(registerButton);

    // Send request
    registerButton.click(function () {
        var settings = {
            domain: domain,
            registrationId: $("#statusList").val(),
            subRegistrationId: $("#subStatusList").val()
        };

        var generator = new CodeFiscaleGenerator(settings);
        generator.generageCodefiscale()
            .then(successCallback, function (response) {
                if (response != null) {
                    alert("Error!\nStatus: " + response.status + "\nText: " + response.responseText);
                }
            });
    });
};