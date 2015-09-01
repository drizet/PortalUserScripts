$(function () {
     function selectOptionByIndexCallback(options) {
        selectOption(options, "option:eq('" + options.params.value + "')");
    }

    function selectOptionByValueCallback(options) {
        selectOption(options, 'option[value="' + options.params.value + '"]');
    }

    function selectOption(options, pattern) {
        var self = options.self;
        var item = $(self).find(pattern);

        if (item) {
            $(self).find("option:selected").removeAttr("selected");
            item.css("background-color", "black");
            item.prop("selected", true).click();
        }
        
        if(options.params.onChange)
        {
            var select = document.getElementById(self.id);
            var event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, true);
            select.dispatchEvent(event);
        }
    }

    function FiscalCodeConfirmedCallback(options) {
        if ($(options.self).val() == "") {
            return;
        }

        $(options.params.selector).check();
    }

    function Listener() {
        var lastHash;

        this.listen = function (callback, options) {
            if (!$.isFunction(callback)) {
                return;
            }

            if (!options) {
                options = {};
            }

            if (!options.property) {
                options.property = "html";
            }

            setInterval(function () {
                var hash;
                switch (options.property) {
                    case "html":
                        hash = md5($(options.self).html());
                        break;
                    case "val":
                        hash = md5($(options.self).val());
                        break;
                }
                if (lastHash != hash) {
                    callback(options);
                    lastHash = hash;
                }

            }, 500)
        }
    }

    $.fn.selectOptionByIndex = function (index, callOnChange) {
        return this.each(function () {
            new Listener().listen(selectOptionByIndexCallback, { self: this, params: { value: index, onChange: callOnChange } })
        });
    }

    $.fn.selectOptionByValue = function (value, callOnChange) {
        return this.each(function () {
            new Listener().listen(selectOptionByValueCallback, { self: this, params: { value: value, onChange: callOnChange } })
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

    $.fn.checkWhenEntered = function (selector) {
        return this.each(function () {
            new Listener().listen(FiscalCodeConfirmedCallback, { self: $(selector), property: "val", params: { selector: this } })
        });
    }
});