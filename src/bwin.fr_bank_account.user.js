// ==UserScript==
// @name        bwin.fr bank account
// @namespace   bwin.fr
// @description prefill bank account
// @include     *www.bwin.fr/*/account/bankaccountregistration/index*
// @version     2.1.3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(function () {
    $("#Input_DepositLimit").val(1250);
    $("#Input_BettingStakes, #Input_PokerStakes").val(100000);
    $("#Input_FromAccountBalance").val(10000);
    $("#Input_RemainingBalance").val(5000);
    $("#Input_Iban").val("FR1420041010050500013M02606");
    $("#Input_BicSwift").val("SOGEFRPP");
});