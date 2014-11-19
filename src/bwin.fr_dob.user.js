// ==UserScript==
// @name        bwin.fr DoB for login
// @namespace   bwin.fr DoB for login
// @description prefill Date of Birth for login
// @include     *www.bwin.fr*
// @exclude     *www.bwin.fr/*/account/contact
// @version     1.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/stub/core.js
// ==/UserScript==

$(function () {
    $("#Input_DateOfBirth").setDate(1, 1, 1992);
});