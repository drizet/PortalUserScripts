// ==UserScript==
// @name        Bank Account Registration
// @namespace   Bank Account Registration
// @description Prefill Bank Account Registration data
// @include     *bwin.fr/*/account/bankaccountregistration/index*
// @version     2.1.5
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// ==/UserScript==

$(document).ready(function(){
	if($("#bankAccountDataFrom").length){
    $("#Input_Iban").val("FR14 2004 1010 0505 0001 3M02 606");
    
    $("#Input_BicSwift").val("SOGEFRPP");
    	
    $(".custom-combobox").each(function(){
		var value = $(this).find(".combobox-list li:first").html();
		$(this).find("input").val(value)
    });
	}
});