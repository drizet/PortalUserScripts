$(function () {
    function selectOptionCallback(options) {
        var item = $(options.self).find(options.pattern);

        if (item.length) {
            $(options.self).find("option:selected").removeAttr("selected");
            item.prop("selected", true).click().change();
        }
    }

    function Listener() {
        var lastHtml;

        this.listen = function (callback, options) {
            if (!$.isFunction(callback)) {
                return;
            }

            setInterval(function () {
                var html = $(options.self).html();
                if (lastHtml != html) {
                    callback(options);
                    lastHtml = html;
                }

            }, 500)
        }
    }

    $.fn.selectOptionByIndex = function (index) {
        index = index != null ? index : 0;

        return this.each(function () {
            new Listener().listen(selectOptionCallback, { self: this, pattern: "option:eq('" + index + "')" })
        });
    }

    $.fn.selectOptionByValue = function (value) {
        value = value != null ? value : "";

        return this.each(function () {
            new Listener().listen(selectOptionCallback, { self: this, pattern: 'option[value="' + value + '"]' })
        });
    }

    $.fn.setDate = function (day, month, year) {
        return this.each(function () {
            var id = this.id;
            $("#" + id + "_Day").selectOptionByIndex(day);
            $("#" + id + "_Month").selectOptionByIndex(month);
            $("#" + id + "_Year").val(year.toString());
            $(this).val(day + '/' + month + '/' + year);
            $("div[data-valmsg-for='" + id.replace(/_/g, ".") + "']").removeClass("field-validation-error");
        });
    }

    $.fn.check = function () {
        return this.each(function () {
            if ($(this).prop("checked")) {
                return;
            }

            $(this).prop("value", true);

            $(this).click();
        });
    }

    $.fn.checkWhen = function (selector) {
        return this.each(function () {
            var self = this;
            var interval = setInterval(function () {
                if ($(selector).length) {
                    $(self).check();
                    clearInterval(interval);
                }
            }, 1000);
        });
    }

    $.fn.change = function () {
        return this.each(function () {
            var id = $(this).attr("id");

            if (id == undefined) {
                return;
            }

            var select = document.getElementById(id);
            var event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, true);
            select.dispatchEvent(event);
        });
    }
});
