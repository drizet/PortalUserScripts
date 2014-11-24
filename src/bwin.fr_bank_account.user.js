// ==UserScript==
// @name        bwin.fr bank account
// @namespace   bwin.fr
// @description prefill bank account
// @include     *www.bwin.fr/*/account/bankaccountregistration*
// @version     2.1.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// ==/UserScript==

$(function () {
    $("#Input_DepositLimit, #Input_BettingStakes, #Input_PokerStakes, #Input_FromAccountBalance, #Input_RemainingBalance").selectOptionByIndex(1);
    $("#Input_Iban").val("FR1420041010050500013M02606");
    $("#Input_BicSwift").val("SOGEFRPP");
});