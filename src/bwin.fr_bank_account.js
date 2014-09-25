// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        bwin.fr bank account
// @namespace   bwin.fr
// @description prefill bank account
// @include     *www.bwin.fr/*/account/bankaccountregistration*
// @version     1
// @grant       none
// ==/UserScript==

$.fn.selectOption = function(index){
  index = index != null ? index : 0;
  return this.each(function(){
    return $(this).find("option:eq("+index+")").prop("selected", true);
  });
}

$("#Input_DepositLimit").selectOption(1);
$("#Input_BettingStakes").selectOption(1);
$("#Input_PokerStakes").selectOption(1);
$("#Input_FromAccountBalance").selectOption(1);
$("#Input_RemainingBalance").selectOption(1);
$("#Input_Iban").val("FR1420041010050500013M02606");
$("#Input_BicSwift").val("SOGEFRPP");