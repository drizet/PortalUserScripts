function CodeFiscaleGenerator(settings) {
    function getCode(statusId) {
        return statusId == "1024" ? "00" : "01";
    }

    function generateUniqueCodeFiscale() {
        var def = $.Deferred();
        var staticPart = settings.domain.value + getCode(settings.registrationId) + "A" + getCode(settings.subRegistrationId) + "S";
        getAllCodeFiscales().then(function (codes) {
            var count;
            do {
                settings.codeFiscale = staticPart + Math.floor((Math.random() * 1000) + 1) + getRandomCharacter();
                count = $.grep(codes, function (code) {
                    return code.fiscalCode == settings.codeFiscale;
                }).length;
            }
            while (count != 0);

            def.resolve();
        });

        return def.promise();
    }

    function getAllCodeFiscales() {
        var domainId = settings.domain.id;
        var def = $.Deferred();
        var link = getAllCodeFiscaleLink + domainId;
        GM_xmlhttpRequest({
            method: "Get",
            url: link,
            onload: function (response) {
                var codes = $.parseXML(response.responseText);
                def.resolve(codes);
            }
        });

        return def.promise();
    }

    function createCodeFiscale() {
        var codeFiscale = settings.codeFiscale;
        var domainId = settings.domain.id;
        var registrationId = settings.registrationId;
        var subRegistrationId = settings.subRegistrationId;

        var def = $.Deferred();
        var link = createCodeFiscaleLink + domainId;
        var request = '<ConfigurableResponses><ConfigurableResponse accountCodeMigrationResponseCode="-1" identificationDocumentUpdateResponseCode="-1" subregistrationResponseCode="' + subRegistrationId + '" checkAccountStatusResponseDescription="4" checkAccountStatusResponseStatus="2" checkAccountStatusResponseCode="1024" editAccountProvinceOfResidenceResponseCode="1024" changeAccountStatusResponseCode="1024" bonusEWalletTransactionResponseCode="1024" eWalletTransactionResponseCode="1024" legalAccountOpeningResponseCode="1024" notifyAccountBalanceResponseCode="1024" individualAccountOpeningResponseCode="' + registrationId + '" fiscalCode="' + codeFiscale + '"/></ConfigurableResponses>';
        GM_xmlhttpRequest({
            method: "Post",
            url: link,
            data: request,
            headers: {
                "Content-Type": "application/xml"
            },
            onload: function () {
                def.resolve();
            }
        });

        return def.promise();
    }

    this.generageCodefiscale = function () {
        return $.Deferred(function (defer) {
            generateUniqueCodeFiscale().then(createCodeFiscale).then(defer.resolve);
        }).promise();
    };
}