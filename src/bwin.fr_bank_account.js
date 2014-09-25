// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        bwin.fr bank account
// @namespace   bwin.fr
// @description prefill bank account
// @include     *www.bwin.fr/*/account/bankaccountregistration*
// @version     1
// @grant       none
// ==/UserScript==

$("#Input_DepositLimit").val("1250");
$("#Input_BettingStakes").val("1250");
$("#Input_PokerStakes").val("100000");
$("#Input_FromAccountBalance").val("7500");
$("#Input_RemainingBalance").val("5000");
$("#Input_Iban").val("FR1420041010050500013M02606");
$("#Input_BicSwift").val("SOGEFRPP");