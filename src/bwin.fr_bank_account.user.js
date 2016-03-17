// ==UserScript==
// @name        Bank Account Registration
// @namespace   Bank Account Registration
// @description Prefill Bank Account Registration data
// @include     *bwin.fr/*/account/bankaccountregistration/index*
// @version     2.1.4
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// ==/UserScript==

$(document).ready(function(){
	if($("#bankAccountDataFrom").length){
    $("#Input_Iban").val("FR14 2004 1010 0505 0001 3M02 606");
    
    $("#Input_BicSwift").val("SOGEFRPP");
    
    $(".comboBox div input").each(function(){
			var firstValue = $(this).next().next().children().first().text();
      $(this).val(firstValue);
		})
	}
});