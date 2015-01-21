// ==UserScript==
// @name         Disable story and defects efforts and todo's
// @namespace    Razor
// @version      0.5
// @match        http://v1.bwinparty.corp/V1-Production/Default.aspx?*DetailTrackingPage*
// @grant        none
// ==/UserScript==

$(function () {
    $("input[_v1_updater_new_key='_new_SimpleStoryEffortColumn']").prop('disabled', 'disabled');
    $("input[_v1_updater='Story.ToDo']").prop('disabled', 'disabled');
    $("span[_v1_updater_new_key='_new_StoryEffortColumn']").find("input, select").prop('disabled', 'disabled');

    $("input[_v1_updater_new_key='_new_SimpleDefectEffortColumn']").prop('disabled', 'disabled');
    $("input[_v1_updater='Defect.ToDo']").prop('disabled', 'disabled');
    $("span[_v1_updater_new_key='_new_DefectEffortColumn']").find("input, select").prop('disabled', 'disabled');
});