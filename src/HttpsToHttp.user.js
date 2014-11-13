// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        HttpsToHttp
// @namespace   HttpsToHttp
// @include     *bwin*
// @include     *giocodigitale*
// @exclude     *cms.bwin*
// @version     2
// @grant       none
// ==/UserScript==

$("a[href^='https']").click(function(event){
  event.preventDefault();
  document.location.href = $(this).attr("href").replace("https", "http");
});