// ==UserScript==
// @name        V1 Team Filter
// @include     *v1.bwinparty.corp/V1-Production/*Page=Widgets/Popups/MoveToTeam
// @version     1.0.0
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js

$("select[_v1_updater='PrimaryWorkitem.Team'] option[value!='Team:3153474'][value!='Team:4363681']").remove()