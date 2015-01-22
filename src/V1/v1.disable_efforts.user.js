// ==UserScript==
// @name         Disable story and defects efforts and todo's
// @namespace    Razor
// @version      0.5.1
// @match        http://v1.bwinparty.corp/V1-Production/Default.aspx?*DetailTrackingPage*
// @require      https://raw.githubusercontent.com/kapetan/jquery-observe/master/jquery-observe.js
// @grant        none
// ==/UserScript==

$(function () {
    var arr = [
                "input[_v1_updater_new_key='_new_SimpleStoryEffortColumn']",
                "input[_v1_updater='Story.ToDo']",
                "span[_v1_updater_new_key='_new_StoryEffortColumn'] input",
                "span[_v1_updater_new_key='_new_StoryEffortColumn'] select",
                "input[_v1_updater_new_key='_new_SimpleDefectEffortColumn']",
                "input[_v1_updater='Defect.ToDo']",
                "span[_v1_updater_new_key='_new_DefectEffortColumn'] input",
                "span[_v1_updater_new_key='_new_DefectEffortColumn'] select"
    ];
    var selector = arr.join();
    $(selector).prop('disabled', 'disabled');

    $("body").observe("added", selector, function () {
        $(this).prop('disabled', 'disabled');
    });
});