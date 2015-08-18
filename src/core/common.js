$(function () {
 	function selectOption(_this, pattern){
            if ($(_this).is(":not(:disabled)")) {
                $(_this).css("color", "#000");
            }
            
            return _this.each(function () {
                var option = $(_this).find(pattern);
                option.attr("selected", true);
                return option;
            }).change();
        }
        
        $.fn.selectOptionByIndex = function (index) {
            index = index != null ? index : 0;
            
            return selectOption(this, "option:eq(" + index + ")")
        }
        
        $.fn.selectOptionByIndexAsync = function (index) {
             var self = this;
             var interval = setInterval(function(){
                if($(self).find("option").length > 1) {
                   $(self).selectOptionByIndex(1);
                    clearInterval(interval);
                } 
            }, 500);
        }

        $.fn.selectOptionByValue = function (value) {
            value = value != null ? value : "";

            return selectOption(this, 'option[value="' + value + '"]')
        }
        
         $.fn.selectOptionByValueAsync = function (value) {
             var self = this;
             var interval = setInterval(function(){
                if($(self).find("option").length > 1) {
                   $(self).selectOptionByValue(value);
                    clearInterval(interval);
                } 
            }, 500);
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
                 var interval = setInterval(function(){
                    if($(selector).length) {
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
