// ==UserScript==
// @name         Disable story and defects efforts and todo's
// @namespace    Razor
// @version      0.6
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
                "span[_v1_updater_new_key='_new_DefectEffortColumn'] select",
                "a[href='operation:Story.QuickClose']",
                "a[href='operation:Defect.QuickClose']"
    ];
    var selector = arr.join();
    $(selector).attr('disabled', 'disabled');

    $("body").observe("added", ".draggable.gg.nest-0", function () {
        $(selector).attr('disabled', 'disabled');
    });

    $("body").observe("added", ".draggable.gg.nest-1", function () {
        $("a[href='operation:Task.QuickClose']").attr('disabled', 'disabled');
    });
});