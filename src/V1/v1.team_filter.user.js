// ==UserScript==
// @name        V1 Team Filter
// @namespace   M&M's
// @include     http://v1.bwinparty.corp/V1-Production/Default.aspx?Page=Widgets/Popups/MoveToTeam*
// @version     0.2
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @grant       none
// ==/UserScript==

$(function () {
	$("select[_v1_updater='PrimaryWorkitem.Team'] option[value!='Team:3153474'][value!='Team:4363681']").remove()
})();