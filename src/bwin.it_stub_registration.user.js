// ==UserScript==
// @name        BWI And GD SSN Registration for Stub server
// @namespace   bwin.it registration
// @description SSN Registration for Stub server
// @version     2.0.0
// @include     *.www.bwin.it/*/registration*
// @include     *qa*www.internal.giocodigitale.it/*/registration*
// @include     *dev.www.giocodigitale.it/*/registration*
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// ==/UserScript==

$(function () {
    if ($("#registration-form").length) {
        $('<iframe>', {
            src: "http://VIW20022:7485/",
            frameborder: 0,
            css: {
                height: 300,
                width: 300,
                position: "absolute",
                top: 0,
                left: 0
            }
        }).appendTo('div.container');

        window.addEventListener("message", receiveMessage, false);
        function receiveMessage(event) {
            if (event.origin !== "http://VIW20022:7485")
                return;
            if (event.data.message == "fillCodeFiscale") {
                $("#Input_BirthData_FiscalCode").val(event.data.value);
            }
        }
    }
});