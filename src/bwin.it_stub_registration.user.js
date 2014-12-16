// ==UserScript==
// @name        BWI And GD SSN Registration for Stub server
// @namespace   bwin.it registration
// @description SSN Registration for Stub server
// @version     1.1.0
// @include     *.www.bwin.it/*/registration*
// @include     *qa*www.internal.giocodigitale.it/*/registration*
// @include     *dev.www.giocodigitale.it/*/registration*
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/fiscaleGenerator/UI.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/fiscaleGenerator/codeFiscaleGenerator.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(function () {
    if ($("#registration-form").length) {
        UI.createInterface(function (codeFiscale) {
            $("#Input_BirthData_FiscalCode").val(codeFiscale);
        });
    }
});