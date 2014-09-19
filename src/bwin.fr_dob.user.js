// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        bwin.fr DoB for login
// @namespace   bwin.fr DoB for login
// @description prefill Date of Birth for login
// @include     *www.bwin.fr*
// @exclude      *www.bwin.fr/*/account/contact
// @version     1
// @grant       none
// ==/UserScript==

$("#Input_DateOfBirth_Day").val("1");
$("#Input_DateOfBirth_Month").val("1");
$("#Input_DateOfBirth_Year").val("1992");
$("#Input_DateOfBirth").val("1/1/1992");

