// ==UserScript==
// @name        NemIdPlugin
// @include     *bwin.dk*
// @version     1.0.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @grant       none
// ==/UserScript==

var nemid = "133478666";
var password = "asasas12";

var containerDiv = $("<div/>", {
		style : "text-align:center"
	});

var credentialsInput = $("<input/>", {
		type : "text",
		readonly : "readonly",
		style : "display:block; margin:5px auto 0; opacity:1",
		value : nemid + "/" + password
	});

var otpCodeInput = $("<input/>", {
		id : "otp-code",
		type : "text",
		placeholder : "otp code",
		focus : function () {
			$(this).val("");
      $("#nemid-code").val("");
		},
		keyup : function () {
			var otp = $("#otp-code").val();
			var code = getNemIdCode(otp);
			$("#nemid-code").val(code);
		}
	});

var nemidCodeInput = $("<input/>", {
		id : "nemid-code",
		type : "text",
		placeholder : "nemid code",
		readonly : "readonly",
		style : "opacity:1"
	});

containerDiv.append(credentialsInput);
containerDiv.append(otpCodeInput);
containerDiv.append(nemidCodeInput);

$(".nemid-container .preheader").append(containerDiv);

function getNemIdCode(key) {
	var obj = localStorage.getItem(nemid);

	if (obj != null) {
		return JSON.parse(obj)[key]; ;
	}

	var storage = new Object();

	$.ajax({
		type : "GET",
		url : "https://cors-anywhere.herokuapp.com/https://appletk.danid.dk/developers/OtpCard?userid=" + nemid,
		dataType : "html",
		success : function (data) {
			var matches = data.match(/\<td align=\"center\"\>(\d{4}?)\<\/td\>\<td align=\"center\"\>(\d{6}?)\<\/td\>/g);

			for (i = 0; i < matches.length; i++) {
				var match = matches[i];
				var otp = match.match(/\d{4}/);
				var code = match.match(/\d{6}/);
				storage["" + otp + ""] = code;
			}
			localStorage.setItem(nemid, JSON.stringify(storage))
		}
	});

	return storage[key];
}