// JavaScript Document


var dataURL = './data/submit.cfc';

var f = document.forms["mainForm"]; // f.checkValidity()


var org_id = 0;
var venue_num = 0;
var emailOK = false;
var dispOK = false;
var newEvent = [];
var orgOK = false;
var venueOK = false;
var formOK = false;
var eventDescriptionOK = false;
var email1OK = false;
var email2OK = false;
var eventNameOK = false;
var startDateOK = false;
var endDateOK = false;
var dateStringOK = false;
var timeStringOK = false;
var ticketstringOK = false;
var orgFormNameInputOK = false;
var orgFormAddressInputOK = false;
var orgFormCityInputOK = false;
var orgFormZipInputOK = false;
var orgFormWebInputOK = true;
var orgFormPhoneInputOK = true;

var venueFormNameInputOK = false;
var venueFormAddressInputOK = false;
var venueFormCityInputOK = false;
var venueFormZipInputOK = false;
var venueFormWebInputOK = true;
var venueFormPhoneInputOK = true;



function checkOrg() {
   orgName = $('#orgName').val();
    $.ajax({
        url: dataURL,
        data: {
            method: 'getOrgID',
           orgName: orgName,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            jData = $.serializeCFJSON({
                data: d
            });
            console.log(jData);
            if (typeof jData.data[0] !== 'undefined') {
                org_id = jData.data[0].org_num;
                $('#orgNames').removeClass('incorrect');
                $('#orgNames').addClass('correct');
                orgOK = true;
            }else{
                $('#orgNames').removeClass('correct');
                $('#orgNames').addClass('incorrect');
                orgOK = false;
                //alert('Please make sure to select an existing Organization name. If it does not appear here, you can add it by selecting add organization');
            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
    });
}

function checkVenue() {
    venueName = $('#venueName').val();
    if (venueName == ''){
        $('#venueNames').addClass('incorrect');
        venueOK = false;
        return;
    }else{
        $('#venueNames').addClass('correct');
    }
    $.ajax({
        url: dataURL,
        data: {
            method: 'getVenueID',
            venueName: venueName,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            jData = $.serializeCFJSON({
                data: d
            });
            console.log(jData);
            if (typeof jData.data[0] !== 'undefined') {
                venue_num = jData.data[0].id;
                $('#venueNames').removeClass('incorrect');
                $('#venueNames').addClass('correct');
                venueOK = true;
            }else{
                $('#venueNames').removeClass('correct');
                $('#venueNames').addClass('incorrect');
                venueOK = false;
                alert('Please make sure to select an existing Venue name. If it does not appear here, you can add it by selecting add venue');
            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
    });
}

function checkEmails() {
    if ($('#email1').val() != $('#email2').val()){
        alert('Emails do not match.');
        emailOK = false;

    }else{
        emailOK = true;
    }
}

function checkDisp() {
    if ($('#disp').val() == -1){
        alert('Please select a discipline');
        dispOK = false;
    }else{
        dispOK = true;
    }
}

function checkField(event) {

    if ( document.getElementById(event.target.id).classList.contains("incorrect")){
        document.getElementById(event.target.id).classList.remove("incorrect");
    }
}



function checkForm() {
    if ($('#eventDescription').val() == ''){
        $('#eventDescription').addClass('incorrect');
        eventDescriptionOK = false;
    }else{
        eventDescriptionOK = true;
        if ($('#eventDescription').hasClass('incorrect')) {
            $('#eventDescription').removeClass('incorrect');

        }
    }
   if ($('#eventName').val() == ''){
        $('#eventName').addClass('incorrect');
        eventNameOK = false;
    }else{
       eventNameOK = true;
       if ($('#eventName').hasClass('incorrect')) {
           $('#eventName').removeClass('incorrect');

       }
   }
    if ($('#startDate').val() == ''){
        $('#startDate').addClass('incorrect');
        startDateOK = false;
     }else{
        startDateOK = true;
        if ($('#startDate').hasClass('incorrect')) {
            $('#startDate').removeClass('incorrect');

        }
    }
    if ($('#endDate').val() == ''){
        $('#endDate').addClass('incorrect');
        endDateOK = false;
    }else{
        endDateOK = true;
        if ($('#endDate').hasClass('incorrect')) {
            $('#endDate').removeClass('incorrect');

        }
    }
    if ($('#dateString').val() == ''){
        $('#dateString').addClass('incorrect');
        dateStringOK = false;
    }else{
        dateStringOK = true;
        if ($('#dateString').hasClass('incorrect')) {
            $('#dateString').removeClass('incorrect');

        }
    }
    if ($('#timeString').val() == ''){
        $('#timeString').addClass('incorrect');
        timeStringOK = false;
    }else{
        timeStringOK = true;
        if ($('#timeString').hasClass('incorrect')) {
            $('#timeString').removeClass('incorrect');

        }
    }
    if ($('#ticketString').val() == ''){
        $('#ticketString').addClass('incorrect');
        ticketstringOK = false;
    }
    else{
        ticketstringOK = true;
        if ($('#ticketString').hasClass('incorrect')) {
            $('#ticketString').removeClass('incorrect');

        }
    }
    if ($('#email1').val() == '') {
        $('#email1').addClass('incorrect');
        email1OK = false;
    } else{
        email1OK = true;
        if ($('#email1').hasClass('incorrect')) {
            $('#email1').removeClass('incorrect');

        }
        }

    if ($('#email2').val() == ''){
        $('#email2').addClass('incorrect');
        email2OK = false;
    }else{
        email2OK = true;
        if ($('#email2').hasClass('incorrect')) {
            $('#email2').removeClass('incorrect');

        }
    }

    if ($('#disp').val() ==-1){
        $('#disp').addClass('incorrect');
        dispOK = false;
    }else{
        dispOK = true;
        if ($('#disp').hasClass('incorrect')) {
                $('#disp').removeClass('incorrect');

        }
    }

}



function submitEvent(){
    checkForm();
    checkEmails();
    checkDisp();

    if ((emailOK) && (dispOK) && (orgOK) && (eventDescriptionOK) && (eventNameOK) && (endDateOK) && (startDateOK) && (email1OK) && (dateStringOK) &&  (timeStringOK) && (email2OK) && (ticketstringOK) && (ticketstringOK) && (venueOK)) {

        disp_num = $('#disp').val() ;
        endDate = $('#endDate').val();
        event_description = $('#eventDescription').val();
        event_name = $('#eventName').val();
        org_num = org_id;
        startDate = $('#startDate').val();
        ticketString = $('#ticketString').val();
        timeString = $('#timeString').val();
        venue_id = venue_num;
        ticketURL = $('#ticketURL').val();
        free = $('#free').prop('checked');
        student = $('#student').prop('checked');
        senior = $('#senior').prop('checked');
        child = $('#child').prop('checked');
        eventPhone = $('#eventPhone').val();
        dateString = $('#dateString').val();
        email = $('#email1').val();
        console.log(newEvent);
        $.ajax({
            url: dataURL,
            data: {
                disp_num:disp_num,
                endDate: endDate,
                event_description: event_description,
                event_name: event_name,
                org_num: org_id,
                startDate : startDate,
                ticketString: ticketString,
                timeString : timeString,
                venue_id : venue_num,
                ticketURL : ticketURL,
                free :free,
                student:student,
                senior : senior,
                child : child,
                eventPhone : eventPhone,
                dateString : dateString,
                email : email,
                method : 'insertUserValuesIntoStage',
                returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            success: function (d, r, o) {
                jData = $.serializeCFJSON({
                    data: d
                });
                console.log(jData);
				$('#eventAck').show();
				setTimeout(closeNewEventAck,2500);

            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
            },
        });
    }
    else{

    }

}

function closeNewEventAck(){
    $('#eventAck').fadeOut(1000);
    clearForm();
}

function clearForm(){
       $('#disp').val(-1)  ;
       $('#endDate').val(null);
        $('#eventDescription').val('');
        $('#eventName').val('');
      $('#startDate').val(null) ;
      $('#ticketString').val('');
       $('#timeString').val('');
      $('#ticketURL').val('');
       $('#free').prop('checked', false);
       $('#student').attr('checked', false);
       $('#senior').attr('checked', false);
        $('#child').attr('checked', false);
         $('#dateString').val('');

}

function checkNewOrgForm(){
    if ($('#orgFormNameInput').val() == '') {
        $('#orgFormNameInput').addClass('incorrect');
        orgFormNameInputOK = false;
    }else {
        orgFormNameInputOK = true;
        if ($('#orgFormNameInput').hasClass('incorrect')) {
            $('#orgFormNameInput').removeClass('incorrect');

        }

    }


    if ($('#orgFormAddressInput').val() == ''){
        $('#orgFormAddressInput').addClass('incorrect');
        orgFormAddressInputOK = false;}
    else {
        orgFormAddressInputOK = true;
        if ($('#orgFormAddressInput').hasClass('incorrect')) {
            $('#orgFormAddressInput').removeClass('incorrect');

        }
    }

    if ($('#orgFormCityInput').val() == ''){
        $('#orgFormCityInput').addClass('incorrect');
        orgFormCityInputOK = false;}
    else {
        orgFormCityInputOK = true;
        if ($('#orgFormCityInput').hasClass('incorrect')) {
            $('#orgFormCityInput').removeClass('incorrect');

        }

    }

    if ($('#orgFormZipInput').val() == ''){
        $('#orgFormZipInput').addClass('incorrect');
        orgFormZipInputOK = false;}
    else {
        orgFormZipInputOK = true;
        if ($('#orgFormZipInput').hasClass('incorrect')) {
            $('#orgFormZipInput').removeClass('incorrect');

        }
    }
    /*
    if ($('#orgFormWebInput').val() == ''){
        $('#orgFormWebInput').addClass('incorrect');
        orgFormWebInputOK = false;}
    else {
        orgFormWebInputOK = true;
        if ($('#orgFormWebInput').hasClass('incorrect')) {
            $('#orgFormWebInput').removeClass('incorrect');

        }
    }
    if ($('#orgFormPhoneInput').val() == ''){
        $('#orgFormPhoneInput').addClass('incorrect');
        orgFormPhoneInputOK = false;}
    else {
        orgFormPhoneInputOK = true;
        if ($('#orgFormPhoneInput').hasClass('incorrect')) {
            $('#orgFormPhoneInput').removeClass('incorrect');

        }
    }
     */
}

function checkNewVenueForm(){
    if ($('#venueFormNameInput').val() == '') {
        $('#venueFormNameInput').addClass('incorrect');
        venueFormNameInputOK = false;
    }else {
        venueFormNameInputOK = true;
        if ($('#venueFormNameInput').hasClass('incorrect')) {
            $('#venueFormNameInput').removeClass('incorrect');

        }

    }


    if ($('#venueFormAddressInput').val() == ''){
        $('#venueFormAddressInput').addClass('incorrect');
        venueFormAddressInputOK = false;}
    else {
        venueFormAddressInputOK = true;
        if ($('#venueFormAddressInput').hasClass('incorrect')) {
            $('#venueFormAddressInput').removeClass('incorrect');

        }
    }

    if ($('#venueFormCityInput').val() == ''){
        $('#venueFormCityInput').addClass('incorrect');
        venueFormCityInputOK = false;}
    else {
        venueFormCityInputOK = true;
        if ($('#venueFormCityInput').hasClass('incorrect')) {
            $('#venueFormCityInput').removeClass('incorrect');

        }

    }

    if ($('#venueFormZipInput').val() == ''){
        $('#venueFormZipInput').addClass('incorrect');
        venueFormZipInputOK = false;}
    else {
        venueFormZipInputOK = true;
        if ($('#venueFormZipInput').hasClass('incorrect')) {
            $('#venueFormZipInput').removeClass('incorrect');

        }
    }
    /*
    if ($('#venueFormWebInput').val() == ''){
        $('#venueFormWebInput').addClass('incorrect');
        venueFormWebInputOK = false;}
    else {
        venueFormWebInputOK = true;
        if ($('#venueFormWebInput').hasClass('incorrect')) {
            $('#venueFormWebInput').removeClass('incorrect');

        }
    }
    if ($('#venueFormPhoneInput').val() == ''){
        $('#venueFormPhoneInput').addClass('incorrect');
        venueFormPhoneInputOK = false;}
    else {
        venueFormPhoneInputOK = true;
        if ($('#venueFormPhoneInput').hasClass('incorrect')) {
            $('#venueFormPhoneInput').removeClass('incorrect');

        }
    }
*/
}
function emailsExist(){
    if (($('#email1').val == '') || ($('#email2').val() == '')){
        alert('Email address needs to be entered and confirmed before submitting new Organizations or Venues');
        return false;
    }else{
        return true;
    }
}

function submitOrg() {
    checkNewOrgForm();
    checkEmails();
    var emailPass = emailsExist();
    if (emailPass) {

        if ((orgFormNameInputOK) && (orgFormAddressInputOK) && (orgFormCityInputOK) && (orgFormZipInputOK) && (orgFormWebInputOK) && (orgFormPhoneInputOK) ) {

            newOrg_Address = $('#orgFormAddressInput').val();
            newOrg_City = $('#orgFormCityInput').val();
            newOrg_Name = $('#orgFormNameInput').val();
            newOrg_Phone = $('#orgFormPhoneInput').val();
            newOrg_Web = $('#orgFormWebInput').val();
            newOrg_Zip = $('#orgFormZipInput').val();
            submitterEmail = $('#email1').val();

            $.ajax({
                url: dataURL,
                data: {
                    newOrg_Address : newOrg_Address,
                    newOrg_City :newOrg_City,
                    newOrg_Name : newOrg_Name,
                    newOrg_Phone : newOrg_Phone,
                    newOrg_Web : newOrg_Web,
                    newOrg_Zip : newOrg_Zip,
                    submitterEmail : submitterEmail,
                    method: 'handleNewOrgSub',
                    returnFormat: 'json'
                },
                method: 'GET',
                dataType: "json",
                success: function (d, r, o) {
                    jData = $.serializeCFJSON({
                        data: d
                    });
                    console.log(jData);

                    prepareOrgSuccess();

                    //$('#closeAddOrg').trigger('click');
                    /*
                    $('#eventAck').show();
                    setTimeout(closeNewEventAck, 2500);
                    */

                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                },
            });
        }
        else {

        }

    }
}

function submitVenue(){
    checkNewVenueForm();
    checkEmails();
    var emailPass = emailsExist();
    if (emailPass) {

        if ((venueFormNameInputOK) && (venueFormAddressInputOK) && (venueFormCityInputOK) && (venueFormZipInputOK) && (venueFormWebInputOK) && (venueFormPhoneInputOK) ) {

            newVenue_Address = $('#venueFormAddressInput').val();
            newVenue_City = $('#venueFormCityInput').val();
            newVenue_Name = $('#venueFormNameInput').val();
            newVenue_Phone = $('#venueFormPhoneInput').val();
            newVenue_Web = $('#venueFormWebInput').val();
            newVenue_Zip = $('#venueFormZipInput').val();
            submitterEmail = $('#email1').val();

            $.ajax({
                url: dataURL,
                data: {
                    newVenueAddress : newVenue_Address,
                    newVenueCity :newVenue_City,
                    newVenueName : newVenue_Name,
                    newVenuePhone : newVenue_Phone,
                    newVenueWeb : newVenue_Web,
                    newVenueZip : newVenue_Zip,
                    submitterEmail : submitterEmail,
                    method: 'handleNewVenueSub',
                    returnFormat: 'json'
                },
                method: 'GET',
                dataType: "json",
                success: function (d, r, o) {
                    jData = $.serializeCFJSON({
                        data: d
                    });
                    console.log(jData);

                    prepareVenueSuccess();

                    //$('#closeAddvenue').trigger('click');
                    /*
                     $('#eventAck').show();
                     setTimeout(closeNewEventAck, 2500);
                     */

                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                },
            });
        }
        else {

        }

    }

}
function prepareOrgForm() {
    if ($('#orgIntro').hasClass('noDisplay')){
        $('#orgIntro').removeClass('noDisplay');
    }
    $('#orgIntro').addClass('display');
    if ($('#orgSuccess').hasClass('display')) {
        $('#orgSuccess').removeClass('display');
    }
    $('#orgSuccess').addClass('noDisplay');
    if ($('#submitButtonOrg').hasClass('noDisplay')){
        $('#submitButtonOrg').removeClass('noDisplay');
    }
    $('#submitButtonOrg').addClass('display');
}
function prepareOrgSuccess() {
    if ($('#orgIntro').hasClass('display')){
        $('#orgIntro').removeClass('display');
    }$('#orgIntro').addClass('noDisplay');
    if ($('#orgSuccess').hasClass('noDisplay')) {
        $('#orgSuccess').removeClass('noDisplay');
    } $('#orgSuccess').addClass('display');

    if ($('#submitButtonOrg').hasClass('display')){
        $('#submitButtonOrg').removeClass('display');
    }
    $('#submitButtonOrg').addClass('noDisplay');
}
function prepareVenueForm() {
    if ($('#venueIntro').hasClass('noDisplay')){
        $('#VenueIntro').removeClass('noDisplay');
    }
    $('#venueIntro').addClass('display');
    if ($('#venueSuccess').hasClass('display')) {
        $('#venueSuccess').removeClass('display');
    }
    $('#venueSuccess').addClass('noDisplay');
    if ($('#submitButtonVenue').hasClass('noDisplay')){
        $('#submitButtonOrgVenue').removeClass('noDisplay');
    }
    $('#submitButtonVenue').addClass('display');
}
function prepareVenueSuccess() {
    if ($('#venueIntro').hasClass('display')){
        $('#venueIntro').removeClass('display');
    }$('#venueIntro').addClass('noDisplay');
    if ($('#venueSuccess').hasClass('noDisplay')) {
        $('#venueSuccess').removeClass('noDisplay');
    } $('#venueSuccess').addClass('display');

    if ($('#submitButtonVenue').hasClass('display')){
        $('#submitButtonVenue').removeClass('display');
    }
    $('#submitButtonVenue').addClass('noDisplay');
}