// ==UserScript==
// @name        Bwin registration
// @namespace   Bwin registration
// @description Prefill registration form on for all bwin labels
// @include     *bwin*/*/registration*
// @include     *gamebookers.com/*/registration*
// @include     *giocodigitale.it/*/registration*
// @include     *partycasino.com/*/registration*
// @include     *sportingbet*/*/registration*
// @include     *totesport*/*/registration*
// @include     *betfred*/*/registration*
// @version     1.0.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/common.js
// @require     https://raw.githubusercontent.com/drizet/PortalUserScripts/master/src/core/random.js
// @require     https://raw.githubusercontent.com/blueimp/JavaScript-MD5/master/js/md5.min.js
// @grant       none
// ==/UserScript==

$(function () {    
    // Portal labels
    var BAW = "bwin.com";
    var BE = "bwin.be";
    var ES = "bwin.es";
    var SHDE = "sh.bwin.de";
    var FR = "bwin.fr";
    var IT = "bwin.it";
    var GD = "giocodigitale.it";
    var GB = "gamebookers.com";
    var GR = "bwin.gr";
	var SPB = "sportingbet"; // includes ro/com and other
    var DK = "bwin.dk";
	
    if ($("#registration-form").length) {
        SetupPersonalData();
        SetupAccountData();

        if (LabelIs(BE)) {
            SetupIdentificationData();
        }

        if (LabelIs(ES)) {
            SetupNieNifData();
        }
        
        if(LabelIs(IT) || LabelIs(GD)){
            SetupDocumentData();
        }
        
        SetupConfirmationData();
     
        // Allow submit disabled fields. Replace 'disabled' attr to 'points-events'
        $("input:disabled, select:disabled").removeAttr('disabled').css("pointer-events", "none").css("opacity", "0.4");
        
        // Fix for remote validation
        setTimeout(function(){
          $("input[data-val-remote-url]").focus().blur(); 
        },500);
    }

    function SetupPersonalData() {
        $("#Input_NameData_FirstName").val(Random.getText(10));
        $("#Input_NameData_LastName").val(Random.getText(10));
        
        if(LabelIs(BAW)){
            var rand = Random.getRandomCharacter("01");

            if(rand == "0"){
                $("input[id$='_TypeOfIdentity'][value='PIN']").click();
                $("#Input_IdentificationData_PIN").val(Random.getNumbers(10));
            }
            else{
                $("input[id$='_TypeOfIdentity'][value='PFN']").click();
                $("#Input_IdentificationData_PFN").val(Random.getNumbers(10));
            }
            
            $("#Input_NameData_MiddleName").val(Random.getText(10));
        }		
		
        if(LabelIs(ES)){
            $("#Input_AddressData_AddressCountryCode").selectOptionByValue("ES");
        }
        else if(LabelIs(BAW)){
            $("#Input_AddressData_AddressCountryCode").selectOptionByValue("GB");
        }
        else if(LabelIs(IT)){
            $("#Input_AddressData_AddressCountryCode").selectOptionByValue("IT");
        }
        else if(LabelIs(GD)){
            $("#Input_AddressData_AddressCountryCode").selectOptionByValue("IT");
        }
        else{
          $("#Input_AddressData_AddressCountryCode").selectOptionByIndex(1);
        }

        if(LabelIs(SPB)){
            $("#Input_IdentificationData_DocumentNumber").val("1920101"+ Random.getNumbers(6));
        }
		
        $("#Input_AddressData_AddressState").selectOptionByIndex(1);
        $("#Input_AddressData_AddressCity").val(Random.getText(6));
		
        var zipCode;
        
        if(LabelIs(SHDE)){
            zipCode = "25355";
        }
        else{
           var zipLengthWithoutPrefix = 4;
        
           if(LabelIs(SPB)){
              zipLengthWithoutPrefix = 5;
           }
            
           zipCode = "2" + Random.getNumbers(zipLengthWithoutPrefix);
        }

        $("#Input_AddressData_AddressZip").val(zipCode);		
        $("#Input_AddressData_AddressLine1").val("address");
        $("#Input_AddressData_AddressLine2").val("address2");
        $("#Input_CurrencyData_CurrencyCode").selectOptionByValue("EUR");
        
        if(LabelIs(DK)){
            $("#Input_BirthData_DateOfBirth_Day").selectOptionByIndex(1, true);
            $("#Input_BirthData_DateOfBirth_Month").selectOptionByIndex(1, true);
            $("#Input_BirthData_DateOfBirth_Year").val("1992");
        }
        else{
            $("#Input_BirthData_DateOfBirth").setDate(1, 1, 1992);
        }
        
        $("#Input_ContactData_EmailAddress").val(Random.getEmail(8, "yopmail.com"));
        $("#Input_ContactData_MobileCountryCode").selectOptionByValue("380")
        $("#Input_ContactData_MobileNumber").val(Random.getNumbers(7));

        if (LabelIs(ES)) {
            $("#Input_NameData_SecondLastName").val(Random.getText(10));
        }

        if (LabelIs(SHDE)) {
            $("#Input_AddressData_Nationality").selectOptionByIndex(1);
            $("#Input_BirthData_PlaceOfBirth").val(Random.getText(7));
        }

        if (LabelIs(FR) || LabelIs(IT) || LabelIs(GD)) {
            $("#Input_BirthData_BirthState").selectOptionByIndex(2, true);
            $("#Input_BirthData_BirthCity").selectOptionByIndex(1, true);
        }
        
        if(LabelIs(IT) || LabelIs(GD)){
             $("#Input_BirthData_FiscalCodeConfirmed").checkWhenEntered("#Input_BirthData_FiscalCode");
        }
        
        if(LabelIs(DK)){
            $("#Input_IdentificationData_CPRCode").val(Random.getNumbers(4));
        }
    }

    function SetupAccountData() {
        if (LabelIs(ES)) {
            SetPassword("123123Qq")
        }
        else {
            SetPassword("123123qq")
        }
        $("#Input_LoginData_Username").val(Random.getUserName(4));

        $("#Input_SecurityData_SecurityQuestion").selectOptionByIndex(1);
        
        if(LabelIs(DK)){
            $("#Input_AccountData_ExpectingPlayerBehaviour").selectOptionByIndex(1);
        }
    }

    function SetPassword(password) {
        $("#Input_LoginData_Password, #Input_LoginData_PasswordConfirmation, #Input_SecurityData_SecurityAnswer").val(password);
    }

    function SetupConfirmationData() {
        $("#Input_TermsAndConditions_TacAcceptance, #Input_BonusData_BonusTacAccepted, #Input_PrivacyPolicy_PrivacyPolicyAccepted").check();
        
		if(LabelIs(GR))
        {
            $("#Input_FundProtection_FundProtectionAcceptance").check();
        }
		
        if(LabelIs(IT) || LabelIs(GD)){
            $("#Input_NewslettersSubscription_NewslettersSubscriptionAccepted, #Input_OtherNoticeSubscription_OtherNoticeSubscriptionsAccepted").check()
        }

        $("#Captcha_Input_Answer").val("+++");
    }

    function SetupIdentificationData() {
        var nrnDate = "920101";
        var nrnSerialNumber = Random.getNumbers(3);
        var nrnChecksum = 97 - (parseInt(nrnDate + nrnSerialNumber) % 97);

        $("#Input_IdentificationData_NRNDate").val(nrnDate);
        $("#Input_IdentificationData_NRNSerialNumber").val(nrnSerialNumber);
        $("#Input_IdentificationData_NRNChecksum").val(pad(nrnChecksum, 2));
        $("#Input_IdentificationData_Profession").selectOptionByIndex(1);
        $("#Input_IdentificationData_CityOfBirth").val(Random.getText(6));
    }

    function SetupNieNifData() {
        $("#Input_NieNif_TaxProvince").selectOptionByIndex(1);

        var dni = Random.getNumbers(8);
        var characters = "TRWAGMYFPDXBNJZSQVHLCKE";
        dni = dni + characters[parseInt(dni) % 23];
        $("#Input_NieNif_IdDocumentNumber").val(dni);
    }
    
    function SetupDocumentData(){
        $("#Input_IdentificationData_DocumentType").selectOptionByIndex(1);
        $("#Input_IdentificationData_DocumentNumber").val(Random.getText(6));
        $("#Input_IdentificationData_DocumentReleaseDate").setDate(1, 1, 1992);
        $("#Input_IdentificationData_DocumentReleasedBy").selectOptionByIndex(1);
        $("#Input_IdentificationData_DocumentReleaseLocation").val(Random.getText(6));
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function LabelIs(host) {
        return document.location.href.indexOf(host) != -1;
    }
});