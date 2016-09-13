
// JavaScript Document
function onIndexPageLoad() {
    firstPass = true;
    dispClick = false;
    finalExtraEvents = '';
    if (localStorage.getItem('currentDisp')) {
        var dispState = [];
        var thisMoment = Math.round(new Date().getTime() / 1000);
        retrievedObject = localStorage.getItem('currentDisp');
        dispState = JSON.parse(retrievedObject);
        var thatMoment = dispState[0].minute;
        var thatDay = dispState[0].day;
        if ((thisMoment - thatMoment < 120)) {
            dispPod = dispState[0].disp;
            getPodsBackButton(dispState[0].disp); //call a different function
            getDispInfo(dispState[0].disp);
            toggleHighlights('open');
        } else {
            dispPod = 98;
            getPods(98);
        }
    } else {
        dispPod = 98;
        getPods(98);
    }

    $("#global-search-bar").keyup(function (event) {
        if (event.keyCode == 13 && $('#global-search-bar').val()) {
            handleGlobalSearchBarClick($('#global-search-bar').val());
        }
    });

}

function clearState() {
    localStorage.removeItem('state');
}


function toggleHighlights(openclose) {

    openclose = typeof openclose !== 'undefined' ? openclose : 'toggle';

    var slide_width = $('.slideshow').width();
    if (openclose == 'open') {
        //force open
        $('.highlights').addClass('open').animate({
            left: 40
        }, 500, function () {
            $(window).trigger('resize');
            $('.browse-top').show();
        });
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        //getLocationReturns();
    } else {
        alert('This browser does not support location services');
    }
}


function getLocationReturns() {


    var date_1 = new Date();
    date_2 = date_1;
    var finalArray = [];
    var contextArray = [];
    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'searchFunction',
            dateWindow: 99,
            disp: -1,
            price: -1,
            neighborhood: -1,
            searchString: '',
            date1: date_1,
            date2: date_2,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            //console.log('r = ' + r +' o = ' + o);
            //$('.overlay').hide(200); 

            jData = $.serializeCFJSON({
                data: d
            });
            console.log(jData);

            var p1 = new LatLon(Geo.parseDMS(myGlobalLocation.lat()), Geo.parseDMS(myGlobalLocation.lng()));
            if (jData.data.length > 0) {
                for (i = 0; i < jData.data.length; i++) {
                    var p2 = new LatLon(Geo.parseDMS(jData.data[i].lat), Geo.parseDMS(jData.data[i].lon));
                    var instanceDistance = kiloconv(p1.distanceTo(p2));


                    if (!isNaN(parseFloat(instanceDistance))) {
                        finalArray.push(jData.data[i]);
                        x = finalArray.length;
                        finalArray[x - 1].instancedistance = instanceDistance;
                    }
                }
                //document.write(finalArray.length+ ' final length of final array');
                finalArray.sort(function (a, b) {
                    return parseFloat(a.instancedistance) > parseFloat(b.instancedistance) ? 1 : -1;
                });


                for (i = 0; i < finalArray.length; i++) {
                    // put measurement units here ----
                    if (finalArray[i].instancedistance <= .1) {
                        finalArray[i].instancedistance = (5280 * finalArray[i].instancedistance).toFixed(0) + ' feet';
                    } else if (finalArray[i].instancedistance > .1 && finalArray[i].instancedistance < .50) {
                        finalArray[i].instancedistance = (1769 * finalArray[i].instancedistance).toFixed(0) + ' yards';
                    } else {
                        finalArray[i].instancedistance = finalArray[i].instancedistance + ' miles';
                    }

                }

                //limit to 50 returns
                for (i = 0; i < 51; i++) {

                    contextArray.push(finalArray[i]);

                }

            }
            //alert(finalArray);
            $('#loader').fadeOut('slow');
            var distanceTemplateSript = $('#distance-template').html();
            distanceTemplate = Handlebars.compile(distanceTemplateSript);
            $('.pods.small-view').empty();
            $('.pods.small-view').append(distanceTemplate(contextArray));
            //$('.pods.grid-view').masonry('destroy');
            $(window).trigger('resize');

        }
    });



}


function showPosition(position) { //alert('in show position');
    //var myLocation = new google.maps.LatLng(37.779789,-122.418812)//city hall temp value
    //var myLocation = new google.maps.LatLng(37.973535,-122.531087)//standford temp value
    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //var myLocation = new google.maps.LatLng(37.779789,-122.418812)//city hall temp value
    var myLatlng = new google.maps.LatLng(40.650429, -73.950348);
    myGlobalLocation = myLocation;
    globalTestLocation = myLatlng;
    getLocationReturns();




}

function initializeBookMarksPage() {
    retrievedObject = localStorage.getItem('events');
    if (retrievedObject) {
        bookMarks = JSON.parse(retrievedObject);
        //alert(bookMarks);
        var bookmarksTemplateScript = $("#bookmarkedEvents-template").html();
        bookTemplate = Handlebars.compile(bookmarksTemplateScript);
        $(".pods.small-view").empty();
        $(".pods.small-view").append(bookTemplate(bookMarks));

    }
}


function handleBookMarkClick() {


}


function handleClearSearch() {
    if ($(".search-box").val()) {
        $('#loader').show();
        var dateView = $('#dateSelect').val();
        var dispView = $('#dispSelect').val();
        var priceView = $('#priceSelect').val();
        var neighborhoodView = $('#neighborhoodSelect').val();
        $(".search-box").val('');
        var searchString = '';
        handleSearchChange('noValue');

    }

}

function checkBoxClick(disp) {
    //if ((disp == 1) || (disp == 3)){	
    //alert('check box click');
    window.location = "search.cfm?disp=" + disp + "&date=weekend";
    //}
    //else{
    //window.location = "search.cfm?disp=" + disp;  
    //}

}

function locationViewBoxClick(location) {
    window.location = "search.cfm?location=" + location;
}

function handleSpecDateClick(date1, date2) {
    //alert(date1 + '   ' + date2);

}

function handleGlobalSearchBarClick(sStringTarget) {
    window.location = "search.cfm?sString=" + sStringTarget;
    //alert(sStringTarget);
}

function searchBoxTabOut() {
    if ($(".search-box").val()) {
        if (!dateHasBeenSelected && getParam("date") != 'weekend' && !getParam("date1")) {
            $('#dateSelect').val('all');
        }
        //$(".search-box").blur();
        handleSearchChange('noValue');
    } else {
        handleSearchChange('noValue');
        //return;	
    }
}


function handleSearchInterface(id) {
    //alert('special function' + id); //$('.view-time').removeClass('active')
    if (id == 'dateSelect') {
        if ($('#dateSelect').val() == 'all') {
            $('.view-time').removeClass('active');
        } else {
            $('.view-time').addClass('active');
        }
    } else if (id == 'dispSelect') {
        if ($('#dispSelect').val() == -1) {
            $('.view-type').removeClass('active');
        } else {
            $('.view-type').addClass('active');
        }
    } else if (id == 'priceSelect') {
        if ($('#priceSelect').val() == -1) {
            $('.view-price').removeClass('active');
        } else {
            $('.view-price').addClass('active');
        }
    } else if (id == 'neighborhoodSelect') {
        if ($('#neighborhoodSelect').val() == -1) {
            $('.view-location').removeClass('active');
        } else {
            $('.view-location').addClass('active');
        }
    }

}



function makeSearchInterfaceActive(id) {
    if (id == 'dateSelect') {
        $('.view-time').addClass('active');
    } else if (id == 'dispSelect') {
        $('.view-type').addClass('active');
    } else if (id == 'priceSelect') {
        $('.view-price').addClass('active');
    } else if (id == 'neighborhoodSelect') {
        $('.view-location').addClass('active');
    }


}

function makeSearchInterfaceInActive(id) {
    if (id == 'dateSelect') {
        $('.view-time').removeClass('active');
    } else if (id == 'dispSelect') {
        $('.view-type').removeClass('active');
    } else if (id == 'priceSelect') {
        $('.view-price').removeClass('active');
    } else if (id == 'neighborhoodSelect') {
        $('.view-location').removeClass('active');
    }
}




function handleRemoveClick(element) {
    if (element == 'view-time') {
        makeSearchInterfaceInActive('dateSelect');
        $('#dateSelect').val('all');
        handleSearchChange('dateSelect');
    } else if (element == 'view-type') {
        makeSearchInterfaceInActive('dispSelect');
        $('#dispSelect').val(-1);
        handleSearchChange('dispSelect');
    } else if (element == 'view-price') {
        makeSearchInterfaceInActive('priceSelect');
        $('#priceSelect').val(-1);
        handleSearchChange('priceSelect');
    } else if (element == 'view-location') {
        makeSearchInterfaceInActive('neighborhoodSelect');
        $('#neighborhoodSelect').val(-1);
        handleSearchChange('neighborhoodSelect');
    }
}

function handleSearchChange(id) {
    
    handleSearchInterface(id);
    pageNumber = 1;
    numberOfPages = 999;
    //extraEvents = 1;
    //$('.overlay').show();
    $('#loader').show();
    var dateView = $('#dateSelect').val();
    var dispView = $('#dispSelect').val();
    var priceView = $('#priceSelect').val();
    var neighborhoodView = $('#neighborhoodSelect').val();
    var searchString = $(".search-box").val();
     var time = Math.round(new Date().getTime() / 1000);

    //State
    var searchState = [];
    var isLocalAvailable = isLocalStorageNameSupported();
        if (isLocalAvailable) {
            if (localStorage.getItem('state')) {
                retrievedObject = localStorage.getItem('state');
                searchState = JSON.parse(retrievedObject);

            }
    }
    var searchItem = {
        date: dateView,
        disp: dispView,
        price: priceView,
        neighborhood: neighborhoodView,
        string: searchString,
        minute: time
    };
    searchState.push(searchItem);
    if (isLocalAvailable) {
        localStorage.setItem('state', JSON.stringify(searchState));
        //console.log(searchState);

        //end state
    }


    if (date1) {
        searchFunctionPaged(dateView, dispView, priceView, neighborhoodView, searchString, pageNumber, numberOfPages, extraEvents, date1, date2);
    } else {
        searchFunctionPaged(dateView, dispView, priceView, neighborhoodView, searchString, pageNumber, numberOfPages, extraEvents);
    }
}

function handlePageAdvance() {
    //$('.overlay').show();  
    $('#loader').fadeIn();
    var dateView = $('#dateSelect').val();
    var dispView = $('#dispSelect').val();
    var priceView = $('#priceSelect').val();
    var neighborhoodView = $('#neighborhoodSelect').val();
    var searchString = $(".search-box").val();
    if (date1) {
        searchFunctionPaged(dateView, dispView, priceView, neighborhoodView, searchString, pageNumber, numberOfPages, extraEvents, date1, date2);
    } else {
        searchFunctionPaged(dateView, dispView, priceView, neighborhoodView, searchString, pageNumber, numberOfPages, extraEvents);
    }
}


var searchFunctionPaged = function (dateView, dispView, priceView, neighborhoodView, searchStringValue, intPageTarget, numberOfPages, finalExtraEvents, date_1, date_2) {

    //alert('pages = ' + pages + ' extra events =' + extraEvents);
    if (intPageTarget == 1) {
        //alert('page target is 1');	
        $.ajax({
            url: '/paper/data/new_V4.php',
            data: {
                method: 'searchFunctionGetNumberOfRecords',
                dateWindow: dateView,
                disp: dispView,
                price: priceView,
                neighborhood: neighborhoodView,
                searchString: searchStringValue,
                date1: date_1,
                date2: date_2,
                intPage: intPageTarget,
                returnFormat: 'json'
            },
            method: 'GET',
            dataType: "json",
            async: false,
            success: function (d, r, o) {
                numberData = $.serializeCFJSON({
                    data: d
                });
                //alert('final extra events = ' +finalExtraEvents);
                currentNumberOfRecords = numberData.data.length;
                var numberOfRecords = {
                    number: numberData.data.length
                };
                numberOfPages = determinePageTarget(currentNumberOfRecords);
                extraEvents = numberOfRecords.number % 30;
                finalExtraEvents = extraEvents;
                var resultsNumberTemplateScript = $('#events-number-template').html();
                numberTemplate = Handlebars.compile(resultsNumberTemplateScript);
                $('.results').empty();
                $('.results').append(numberTemplate(numberOfRecords));
                /*Add class to make result count visible */
                $('.search-wrap').addClass('show-result-count');

            }
            
        });
    }


    

    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'searchFunctionPaged',
            dateWindow: dateView,
            disp: dispView,
            price: priceView,
            neighborhood: neighborhoodView,
            searchString: searchStringValue,
            date1: date_1,
            date2: date_2,
            intPage: intPageTarget,
            numberOfPages: numberOfPages,
            extraEvents: extraEvents,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",

        success: function (d, r, o) {
            //console.log('r = ' + r +' o = ' + o);
            //$('.overlay').hide(200); 

            jData = $.serializeCFJSON({
                data: d
            });
            var dispListTemplateScript = $("#events-list-template").html();
            listTemplate = Handlebars.compile(dispListTemplateScript);
            $(".pods.list-view").empty();
            $(".pods.list-view").append(listTemplate(jData));

            var dispGridTemplateScript = $("#events-grid-template").html();
            gridTemplate = Handlebars.compile(dispGridTemplateScript);
            $(".pods.grid-view").empty();
            $(".pods.grid-view").append(gridTemplate(jData));
            ////$('.pods.grid-view').masonry('destroy');   
            //$(window).trigger('resize');
            var pageStatus = {
                pages: numberOfPages,
                curPage: intPageTarget
            };

            var morePagesScript = $("#moreEvents-template").html();
            morePagesTemplate = Handlebars.compile(morePagesScript);
            $("#loadMoreSpan").empty();
            $("#loadMoreSpan").append(morePagesTemplate(pageStatus));
            if (numberOfPages == 1 || numberOfPages == intPageTarget) {
                $('.read-more').hide();
            } else if (intPageTarget < numberOfPages) {
                $('.read-more').show();
            }
            //var numberOfRecords = {number:jData.data.length};

            //alert(numberOfPages);

            /*Add class to make result count visible */
            $('.search-wrap').addClass('show-result-count');
            $(window).trigger('resize');
            //$('#loader').fadeOut('slow');
        }
    }).done(function (msg) {
        $('#loader').fadeOut('slow');
    });


};

    function advancePage(intPageTarget) {
        //alert('the current page is ' + intPageTarget);	
        pageNumber = intPageTarget;
        //alert('the new page is ' + pageNumber);
        handlePageAdvance();
    }

    function determinePageTarget(numberOfRecords) {

        numberOfPages = numberOfRecords / 30;
        if (numberOfPages <= 1) {
            numberOfPages = 1;
            extraEvents = numberOfRecords.number % 30;
            if (extraEvents > 0) {
                finalExtraEvents = extraEvents;
            } else {
                finalExtraEvents = 30;
            }
            return numberOfPages;
        }
        //notice global variable being set here....not good
        //this should be fixed now....
        extraEvents = numberOfRecords % 30;
        //var finalExtraEvents = extraEvents;
        if (extraEvents === 0) {
            return numberOfPages;
        } else {
            //bitwise or
            numberOfPages = numberOfPages | 0;
            numberOfPages = numberOfPages + 1;
            return numberOfPages;
        }
    }

var getPods = function (disp) {

    $('.first.all a').addClass('active');

    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'getEditorialContent',
            Disp_Num: disp,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            //console.log('r = ' + r +' o = ' + o);
            jData = $.serializeCFJSON({
                data: d
            });
            var podsTemplateScript = $("#pods-template").html();
            podsTemplate = Handlebars.compile(podsTemplateScript);
            $(".pods.grid-view").empty();
            $(".pods.grid-view").append(podsTemplate(jData));
    
            $(window).trigger('resize');
            $('#loader').fadeOut('slow');
        }
    });


    //write current disp because one has been clicked	
    if (disp < 20) {
        localStorage.removeItem('currentDisp');
        var dispState = [];
        var storedMoment = Math.round(new Date().getTime() / 1000);
        var storedDay = moment().day();
        var dispItem = {
            disp: disp,
            minute: storedMoment,
            day: storedDay
        };
        dispState.push(dispItem);
        localStorage.setItem('currentDisp', JSON.stringify(dispState));
        //console.log(dispState);
    }
};


//within the back button time limit -- call this function without calling getPods
var getPodsBackButton = function (disp) {
    $('ul.cat-list li a').removeClass('active');
    $('ul.cat-list #' + disp + ' a').addClass('active');
    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'getEditorialContent',
            Disp_Num: disp,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            //console.log('r = ' + r +' o = ' + o);
            jData = $.serializeCFJSON({
                data: d
            });
            console.log(jData);
            var podsTemplateScript = $("#pods-template").html();
            podsTemplate = Handlebars.compile(podsTemplateScript);
            $(".pods.grid-view").empty();
            $(".pods.grid-view").append(podsTemplate(jData));
            //$('.pods.grid-view').masonry('destroy');

            $(window).trigger('resize');
            $('#loader').fadeOut('slow');
        }
    });




};


var getEventsByDate = function (firstDate, secondDate) {

    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'getMasterEventsByDate',
            date1: firstDate,
            date2: secondDate,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            //console.log('r = ' + r +' o = ' + o);
            jData = $.serializeCFJSON({
                data: d
            });
            var dispListTemplateScript = $("#events-list-template").html();
            listTemplate = Handlebars.compile(dispListTemplateScript);
            $(".pods.list-view").empty();
            $(".pods.list-view").append(listTemplate(jData));

            var dispGridTemplateScript = $("#events-grid-template").html();
            gridTemplate = Handlebars.compile(dispGridTemplateScript);
            $(".pods.grid-view").empty();
            $(".pods.grid-view").append(gridTemplate(jData));
            //$('.pods.grid-view').masonry('destroy');
            $(window).trigger('resize');


        }
    });
};




var getDispInfo = function (disp) {

    retrievedObject = localStorage.getItem('currentDisp');

    if (retrievedObject) {

    }

    $.ajax({
        url: '/paper/data/new_V4.php',
        data: {
            method: 'getDispInfo',
            Disp_Num: disp,
            returnFormat: 'json'
        },
        method: 'GET',
        dataType: "json",
        success: function (d, r, o) {
            if (d !== null) {
                //put see more page template data here....	
            } else {
                $(".hide.browse-top.hide").empty();

            }

        }
    });
};

    function getDispCombo(selection) {
        var sel = selection.options[selection.selectedIndex].value;
        dispPod = sel;
        getPods(sel);
        getDispInfo(sel);
        //window.location.hash = '#grid-view';
        window.scrollTo(0, 1);
    }

    function selectSearchView(selection) {
        var sel = selection.options[selection.selectedIndex].value;
        if (sel == 'list') {
            $('.pods.list-view').show();
            $('.pods.grid-view').hide();
        } else {
            $(window).trigger('resize');
            $('.pods.list-view').hide();
            $('.pods.grid-view').show();
        }
    }

Handlebars.registerHelper("dateDispSwitch", function (discipline, occurred) {

    if (dispPod == 99 || dispPod == 98) {
	    var string =  '<div class="detail date">' + discipline + '</div>';
         return string; 
    }else{
	    return '';
    }
});

Handlebars.registerHelper("showDisp", function (discipline, occurred) {
    //console.log("dispPod = "+ dispPod + ' ' + discipline);    
    if (dispPod == 99 || dispPod == 98) {
        return occurred;
    }

});


Handlebars.registerHelper("showSearchImage", function (imagename) {

    if (imagename !== null && imagename !== '') {
        return imagename;
    } else {
        return 'images/blankImage.gif';
    }
});

Handlebars.registerHelper("showImageCSS", function (imagename, event_num) {

    if (imagename !== null && imagename !== '') {
        return "width:75px;height:75px";
    } else {
        $("#" + event_num).css("visibility", "hidden");
        return "width:1px;height:1px";
    }
});


Handlebars.registerHelper("hideMoreForLess", function (disp_num, discipline) {
    if (disp_num != 10) {
        var string = '<a href="search.cfm?disp=' + disp_num + '" class="read-more" >See All ' + discipline + ' Events</a>';
        return string;
    }

});

Handlebars.registerHelper("hideMoreForLessTop", function (disp_num, discipline) {
    if (disp_num != 10) {
        var string = '<h5><a class="more" href="search.cfm?disp=' + disp_num + '">See All ' + discipline + ' Events</a></h5>';
        return string;
    }

});

Handlebars.registerHelper("Decode", function (eventName) {
    //eventName = decodeURIComponent(eventName);
    eventName = unescape(eventName);
    return eventName;
});


Handlebars.registerHelper("editEventDescription", function (testString) {
    if (testString) {
        if (testString.length > 220) {
            testString = testString.slice(0, 220);
            testString = testString.split("").reverse().join("");
            var offSet = testString.indexOf(' ') + 1;
            testString = testString.slice(offSet, 220);
            testString = testString.split("").reverse().join("");
            testString = testString + ' ...';
            return testString;
        } else {
            return testString;
        }
    }
});

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    // split param and value into individual pieces
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) {
            sval = temp[1];
        }
    }
    return sval;
}

function checkDatesInBookmarks() {
    var now = moment();
    var nowMoment = moment(now, 'MM-DD-YYYY');

    retrievedObject = localStorage.getItem('events');

    if (retrievedObject) {
        var jsonString = JSON.parse(retrievedObject);
        length = jsonString.length;
        for (var i = 0; i < length; i++) {
            var endDate = jsonString[i].end_date;
            var event_num = jsonString[i].event_num;
            var endDateMoment = moment(endDate, 'MM-DD-YYYY');
            if (nowMoment.diff(endDate, 'days') * -1 >= 0) {} else {
                //remove from storage

                jsonString.splice(i, 1);
                console.log(jsonString);
                localStorage.events = JSON.stringify(jsonString);
                length--;
            }
        }

    }
}

function kiloconv(val) {

    var distance = ((val * 0.621)).toFixed(2);
    return distance;

}

function isLocalStorageNameSupported()
{
    var testKey = 'test', storage = window.sessionStorage;
    try
    {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    }
    catch (error)
    {
        return false;
    }
}

$( document ).ajaxError(function() {
  alert( "Triggered ajaxError handler." );
});
