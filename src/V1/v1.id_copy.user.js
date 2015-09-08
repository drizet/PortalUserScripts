// ==UserScript==
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @name        v1_id_copy
// @namespace   v1_id_copy
// @description copy v1 id with link
// @author      Maksym Cherkes
// @version     0.5.0
// @grant       GM_setClipboard
// @include     *v1.bwinparty.corp*
// ==/UserScript==

$(function() {
    function createButton() {
        if ($("#copyviplink").attr('src') == null) {
            $(".toolbar").append('<img id="copyviplink" width="16" height="16" src="http://www.per-aspera.ru/images/stories/b-android-help__step__img_link.png"' +
                ' style="float: right; margin-right: 5px; cursor: pointer;"></img>');

            $("#copyviplink").click(function() {
                var itemId = $(".toolbar h4").text().replace('Backlog Item ', '').replace('Defect ', '').replace('Impediment ', '').replace('Request ', '').replace('Task ', '').trim();
                var itemTitle = $(".asset-heading h3").text().trim();
                var itemUrl = $(".copylink").val();
                var itemStyle = "font: 11pt Calibri;";
                var result = "<a href='" + itemUrl + "' style='" + itemStyle + "'>" + itemId + " " + itemTitle + "</a>";
                GM_setClipboard(result, "html");
                $("#copyviplink").attr("src", "http://icons.iconarchive.com/icons/icojam/blue-bits/256/symbol-check-icon.png");
            });
        }
    }

    function addHandler() {
        $(".open-by-name").click(function() {
            setTimeout(createButton, 1000);
        });
    }

    addHandler();
    $(".show").click(function() {
        setTimeout(addHandler, 1000);
    });
    if ($(".copylink").val() != null) {
        createButton();
    };
});