function UI() { }

UI.createInterface = function (domains, successCallback) {
    if ($.isArray(domains)) {
        
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

    function addRow(text, list) {
        mainDiv.append($("<div>").append(text).append("<br/>").append(list));
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
    addRow("Domain: ", createList("domainList", domains));
    // Create registration status list and text
    addRow("Registration status: ", createList("statusList", statuses));
    // Create subregistration status status list
    addRow("Sub registration status: ", createList("subStatusList", statuses));

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
            domain: getDomain(),
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
}