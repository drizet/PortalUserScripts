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
			$("div[data-valmsg-for='"+ id.replace(/_/g, ".") +"']").removeClass("field-validation-error");
        });
    }

    $.fn.check = function () {
        return this.each(function () {
            if ($(this).prop("checked")) {
                return;
            }

            $(this).prop("checked", true);
            $(this).parent().addClass("checked").click();
        });
    }


    LabelIs = function (string host) {
	      return document.location.href.indexOf(host) != -1;
    }
});
