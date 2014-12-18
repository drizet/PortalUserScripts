function CodeFiscaleGenerator(settings) {
    var webService = "http://VIW20022:7485/api/AamsRegistration/";

    function generateCodeFiscaleInner(){
        var def = $.Deferred();

        var request = {
            registrationStatus : settings.registrationId,
            subregistrationStatus : settings.subRegistrationId
        };

        GM_xmlhttpRequest({
            method: "Post",
            url: webService + settings.domain.id,
            data: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            onload: function (response) {
                if (response.status == "200") {
                    def.resolve(JSON.parse(response.responseText).codeFiscale);
                }
                else {
                    console.log("createCodeFiscale error: status - %d, message - %s", response.status, response.responseText);
                    def.reject(response);
                }
            }
        });

        return def.promise();
    }

    this.generageCodefiscale = function () {
        return $.Deferred(function (defer) {
            generateCodeFiscaleInner().then(defer.resolve, defer.reject);
        }).promise();
    };
}