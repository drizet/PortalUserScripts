$(function () {
    $.fn.selectOptionByIndex = function (index) {
        index = index != null ? index : 0;
        return this.each(function () {
            return $(this).find("option:eq(" + index + ")").prop("selected", true).click();
        });
    }
    $.fn.selectOptionByValue = function (value) {
        value = value != null ? value : "";
        return this.each(function () {
            return $(this).find('option[value="' + value + '"]').prop("selected", true).click();
        });
    }

    $.fn.setDate = function (day, month, year){
        return this.each(function () {
            var id = this.id;
            $("#" + id + "_Day").selectOptionByIndex(day);
            $("#" + id + "_Month").selectOptionByIndex(month);
            $("#" + id + "_Year").val(year.toString());
            $(this).val(day + '/' + month + '/' + year);
        });
    }

    $.fn.check = function () {
        return this.each(function () {
            console.log($(this).prop("checked"));
            if ($(this).prop("checked")) {
                return;
            }

            $(this).prop("checked", true);
            $(this).parent().addClass("checked").click();
        });
    }
});
