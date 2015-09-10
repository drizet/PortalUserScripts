// ==UserScript==
// @author      Maksym Cherkes
// @name        v1_id_copy
// @namespace   v1_id_copy
// @description copy v1 id with link
// @include     *v1.bwinparty.corp*
// @version     0.6.5
// @grant       GM_setClipboard
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/kapetan/jquery-observe/master/jquery-observe.js
// ==/UserScript==

$(document).ready(function () {
    var linkImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAFdElEQVR42uXaX0hedRzHcR2jRx+jRHvUTVtsjhqN6cwL/zSKatTF6I9G4YpQiLqJdRGbWuQwchusVheymiKNhSvm3NzmWEF00UW0jHaTrH8X0qajmlZT1x82/fUmPPDw4zzn+3v8Jefn8eIF/jm/5xw+Pufz/PydX4ZS6j+1H41FTQxNOIFZqDkzOIeG5OPJQBTVsLZgCKP4B8rHBRxC0VIOqwk/QBk6hrVLMaxGjEOlqQ/rllJYDbgKNU/HsGYphPWUQVDTUILjKIhyWM8Kt95R1OB2PIEpIbABFEYxrOcxKnRRqTamzhsToB+lUQqrEb8K75B4irHPYDTd0ve+iFqZDxi8xuOYMil9PawolflR5Bi+1sOmpa+FFYkyP4SVab7mowbvsCNIeGFFocz7A4KS1AuvPYNmL6yolrnMvPTHvLCiXeYyL4P6oFvSCyvaZS5LzuExKazolLl9WCW4IIQVkTK3D2sFfl8sYT2JcYsyt+msG9AC5WPStbDiOGdR5rZhtUH5uIp3XQurDdMWZW6jAyqFn1DhUljZ+AXKRzdWLGRQwnpXh2v/7lRC+fgWdwhjcy3O247ZgKA6UehaWPVQPt5GLMWYu7Ade5Gf5vmy0AoV4CAKXFx12BKwTFLkc3wtvoeasxt5afajCnAY2a6uZz0ScOE12rEbMezXLbjRosw9vYi7vFJaBeVjJ7KTjrsb3wSsPd1qWeY9yHd9DT4PE1BzZtGGZUnHbBbmYduQZVHmXSheLE93Xoeas0f73f34CiqF08i1LPPEYnpuGMNZ7Nd+XqPderpT/2+Zy2G5FFhm0vflQlADC1Hm7oflkcvc8z4StmUegV00Ypn3BizTZJqWuSv7s/JxJyqxCVVYj5vFsXKZn9CWaVYhK+m8L5mUuSub2apwAJe0i7yMN/UZuWWZV+AMtmMrPjQpc2SEHVYlhqAEY3jRZ7ZdjuE0ynw9vtAeWYlljowww8rBXoxAGdqHm9Is81u0P8ynUBqxzMMMqxidUGk4iao0y7xYO/5LKEPd3vgww8pHT5pBDWjvkPuEMj+p3a7L8CpmDW/3AyhARphhxdErXOwEzuM6FAa1oKrnOTPPxR78lmLcLL7Gg96YMMPKxmEhqN3akkoz7kn6WZndzBwEj63owX68h1aUe8eEHVYCB4WgmvVPHe37WuOZuSwTBchDwrtlXQirGF1QKcyiXXiNB0zL3ELIYcllPo0Oy5n5Ge8d6HJY9mUuB1UjTDh/RK5W4htcDMu2zNsMLmgwYPx3WO1T/hPIcS0smzJvRZZQwI0BSyVDKEt+vKXNzF9AtkthWZe5EFYd/obSnEW1FtQn2jGf4TZ3w5LLfErrKBP7MAOFaxjGRu2cn0Np/kKZq2HFLMpc8hYUOn3mQ5sCzlftaljbcF3Ymhib50VlIttbY9cFLLFUuBjWc7hisTXRRgmuQWkmscG1sBpx0WJroo3lAZ+6H6PEmbA4+CFctNiaaCOGHQHnfhrLXQjLu9ihELYmmjwAHfH+SK6E1RSwM/gI4iFtTfwDDchwKazBFJ9+H2B1iFsT30GGa2FNQvm41+LktlsTu7HKubAWaiJou5tFG+d8WLsQW5gylx+AuhrW+YCLb1+AMhcfgLoc1qmAfzP+xC7zk9rvZnE9rDr8LCzF7LQvc3k3i8fpZWXDJ8qvIB6BMrcOayUGoAQvh1DmTq7Br8ExKMFrIZS5k2vw69AHBQilH0KZu7b4V4p+KKH022zKPApheQoNO6wFa+fsMC3zKIXlKcBxKMEljJuWeVTDMi590zKPdFjmpS+XeZTD0pXO4x3W6ZV5FMOSFKEPl4WHryN4w9ujEN2wZAm0YAxKcwVd2OwdH7Ww/gV4sDBzSMGmOwAAAABJRU5ErkJggg==";
    var checkImage = "data:image/png;base64,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";

    function createButton() {
        if ($("#copyviplink").attr('src') == null) {
            $(".toolbar").append('<img id="copyviplink" width="16" height="16" src="' + linkImage + '" style="float: right; margin-right: 5px; cursor: pointer;"></img>');
        }
    }

    function addHandlers() {
        var $body = $("body");

        $body.delegate("#copyviplink", "click", function () {
            var itemId = $(".toolbar h4").text().replace('Backlog Item ', '').replace('Defect ', '').replace('Impediment ', '').replace('Request ', '').replace('Task ', '').trim();

            // Make icon of V1 item;
            var cssBackgroundImage = $(".toolbar .icon").css("background-image");
            var image = "";
            if (cssBackgroundImage) {
                var itemIconUrl = cssBackgroundImage.replace('url(', '').replace(')', '');
                image = "<img src='" + itemIconUrl + "'></img>";
            }

            var itemTitle = $(".asset-heading h3").text().trim();
            var itemUrl = $(".copylink").val();
            var itemStyle = "font: 11pt Calibri;";
            var result = image + "<a href='" + itemUrl + "' style='" + itemStyle + "'>" + itemId + ": " + itemTitle + "</a>";
            GM_setClipboard(result, "html");
            $("#copyviplink").attr("src", checkImage);
        });

        $body.observe("added", ".inline-asset-detail .toolbar", function() {
            createButton();
        });
    }

    addHandlers();

    // For standalone page
    if ($(".copylink").val() != null) {
        createButton();
    }
});