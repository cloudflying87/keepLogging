// const util = require("util");
const $div = $("<div>");
const $accordian = $("#dyn-form");
var aircraftDropDown;
let flightEditId = 0;
let userData = {};
let toggle = {
    tab: "",
    value: false
};
let aircraftDropDownValues = [];

// onload, make an api call to /api/user_data that will return a json object with their email and id. store this as a global object. then call getFlights()
$(document).ready(async function () {
    await $.ajax({
        method: "GET",
        url: "/api/user_data"
    })
        .then(result => {
            userData = result;
            getAircraftTypes ();
            // console.log(userData)
        })
        .catch(err => console.error(err));

    getFlights(userData.id);
});

$("#create-flight").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();
    // 3 cases
    // not active, not clicked => click it
    // not active, has been clicked => click it
    // make active and show
    // active, has been clicked =>  click it
    // close and hide

    if (!toggle.value && toggle.tab !== "CREATE_FLIGHT" || toggle.value && toggle.tab !== "CREATE_FLIGHT") {
        createFlight();
        $accordian.show();
        toggle.tab = "CREATE_FLIGHT";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CREATE_FLIGHT") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

$("#show-totals").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();

    if (!toggle.value && toggle.tab !== "CALL_TOTALS" || toggle.value && toggle.tab !== "CALL_TOTALS") {
        callTotals();
        $accordian.show();
        toggle.tab = "CALL_TOTALS";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CALL_TOTALS") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

$('#create-aircraft').on('click', function (e) {
    e.preventDefault();
    $accordian.empty();

    if (!toggle.value && toggle.tab !== "CREATE_AIRCRAFT" || toggle.value && toggle.tab !== "CREATE_AIRCRAFT") {
        createAircraft();
        $accordian.show();
        toggle.tab = "CREATE_AIRCRAFT";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CREATE_AIRCRAFT") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

function getAircraftTypes () {
        $.ajax({
            method: "GET",
            url: `/api/aircraftTypes`
        })
            .then(air => air.map(a => {
                aircraftDropDownValues.push(a)
            }))
            .catch(err => console.error(err));
    };

function createInputLoop(arr1, arr2) {
    $accordian.append(arr2[0], '<hr>')
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i]=='aircraftID'){
            const $dropdown = $('<select>')
            $dropdown.attr('id', arr1[i]);
            const $label = $("<label>");
            const $newAir = $('<a href =#>');
            $newAir.attr('id','addAircraftShortcut')
            $newAir.text(' :Add Aircraft')
            $dropdown.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            $label.append($newAir)
            $accordian.append($label, $dropdown);
        } else {
            const $input = $('<input class=form-control>');
            const $label = $("<label>");
            $input.attr('id', arr1[i]);
            $input.attr('placeholder', arr1[0]);
            $input.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            $accordian.append($label, $input);
        }
    };
};
// Input boxes for the create aircraft menu
function createInputLoopCheckboxes(arr1, arr2) {
    $accordian.append(arr2[0], '<hr>')
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input type=checkbox value=0 class=aircraft-chkbx>');
        const $label = $('<label>');
        $input.attr('id', arr1[i]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i + 1]);
        // $div.addClass("input-group-prepend");
        // $div.append($input)
        $accordian.append($label, $input);
    };
};

// Used to make all of the input boxes for the create flight section
function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments', 'instructor', 'student']
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'Arrival Airports', 'Comments', 'Instructor', 'Student']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = [0, 'iap', 'holds', 'landings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Aproaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
    createInputLoop(approachLanding, approachLandingInfo)
    // Times
    const flightTimesIds = ['0.00', 'total', 'cxt', 'night', 'hood', 'imc', 'dualI', 'cfi', 'sic', 'pic', 'solo']
    const flightTimesidsLabel = ['Flight Times', 'times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual (Instruction Recieved)', 'CFI (Instructor)', 'SIC (Second in Command)', 'PIC (Pilot in Command)', 'Solo']
    createInputLoop(flightTimesIds, flightTimesidsLabel)

    const newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight")
    $accordian.append(newButton)

    $("#createFlightButton").click(function (event) {
        event.preventDefault();
        
        if ($('#createFlightButton').text() == 'Add Flight') {
            writeFlightTime('create');
        } else {
            writeFlightTime('edit');
        }
        
    })
    
    $("#addAircraftShortcut").click(function (event) {
        event.preventDefault();
        $('#dyn-form').empty();
        createAircraft();
    })

    try {
        for (let i = 0; i < aircraftDropDownValues.length; i++) {
            let options = $('<option>').text(aircraftDropDownValues[i]).attr('value', aircraftDropDownValues[i])
            $('#aircraftID').append(options)
        }
       aircraftDropDown = new SlimSelect({
            select: '#aircraftID',
        });
        // aircraftDropDown.set(aircraftDropDownValues)
        
    } catch (error) {console.error};
};

// The post route to create a new flight record. Reading from the input boxes and then sending to the database. Converting the aircraftID to a number with a get route. 
async function writeFlightTime(action) {
    let writeFlightArray =[]
       $('.form-control').each(function(){
        if ($(this).hasClass('app')) {
            let appName = $(this).attr('id')
            if ($('#'+appName).val().trim()==''){
                var objectItem = {appName: 0.00}
            } else {
                var objectItem = {appName: $('#'+appName).val().trim()}
            };
            writeFlightArray.push(objectItem)
        }
                Error();
        });

 /*   if ($("#imc").val() == '' || $("#imc").val() == null ) {
        imc = 0.00
    } else {
        imc = $("#imc").val().trim()
    };
    if ($("#hood").val().trim() == '') {
        hood = 0.00
    } else {
        hood = $("#hood").val().trim()
    };
    if ($("#holds").val().trim() == '') {
        holds = 0
    } else {
        holds = $("#holds").val().trim()
    };
    if ($("#iap").val().trim() == '') {
        iap = 0.00
    } else {
        iap = $("#iap").val().trim()
    };
    if ($("#landings").val().trim() == '') {
        landings = 0.00
    } else {
        landings = $("#landings").val().trim()
    };
    if ($("#dayLdg").val().trim() == '') {
        dayLdg = 0.00
    } else {
        dayLdg = $("#dayLdg").val().trim()
    };
    if ($("#nightLdg").val().trim() == '') {
        nightLdg = 0.00
    } else {
        nightLdg = $("#nightLdg").val().trim()
    };
    if ($("#pic").val().trim() == '') {
        pic = 0.00
    } else {
        pic = $("#pic").val().trim()
    };
    if ($("#sic").val().trim() == '') {
        sic = 0.00
    } else {
        sic = $("#sic").val().trim()
    };
    if ($("#dualI").val().trim() == '') {
        dualI = 0.00
    } else {
        dualI = $("#dualI").val().trim()
    };
    if ($("#cfi").val().trim() == '') {
        cfi = 0.00
    } else {
        cfi = $("#cfi").val().trim()
    };
    if ($("#solo").val().trim() == '') {
        solo = 0.00
    } else {
        solo = $("#solo").val().trim()
    };
    if ($("#cxt").val().trim() == '') {
        cxt = 0.00
    } else {
        cxt = $("#cxt").val().trim()
    };
    if ($("#night").val().trim() == '') {
        night = 0.00
    } else {
        night = $("#night").val().trim()
    };
    if ($("#total").val().trim() == '') {
        total = 0.00
    } else {
        total = $("#total").val().trim()
   };

*/ 
    //----------------------------

    if ($("#imc").val().trim() == '') {
        imc = 0.00
    } else {
        imc = $("#imc").val().trim()
    };
    if ($("#hood").val().trim() == '') {
        hood = 0.00
    } else {
        hood = $("#hood").val().trim()
    };
    if ($("#holds").val().trim() == '') {
        holds = 0
    } else {
        holds = $("#holds").val().trim()
    };
    if ($("#iap").val().trim() == '') {
        iap = 0.00
    } else {
        iap = $("#iap").val().trim()
    };
    if ($("#landings").val().trim() == '') {
        landings = 0.00
    } else {
        landings = $("#landings").val().trim()
    };
    if ($("#dayLdg").val().trim() == '') {
        dayLdg = 0.00
    } else {
        dayLdg = $("#dayLdg").val().trim()
    };
    if ($("#nightLdg").val().trim() == '') {
        nightLdg = 0.00
    } else {
        nightLdg = $("#nightLdg").val().trim()
    };
    if ($("#pic").val().trim() == '') {
        pic = 0.00
    } else {
        pic = $("#pic").val().trim()
    };
    if ($("#sic").val().trim() == '') {
        sic = 0.00
    } else {
        sic = $("#sic").val().trim()
    };
    if ($("#dualI").val().trim() == '') {
        dualI = 0.00
    } else {
        dualI = $("#dualI").val().trim()
    };
    if ($("#cfi").val().trim() == '') {
        cfi = 0.00
    } else {
        cfi = $("#cfi").val().trim()
    };
    if ($("#solo").val().trim() == '') {
        solo = 0.00
    } else {
        solo = $("#solo").val().trim()
    };
    if ($("#cxt").val().trim() == '') {
        cxt = 0.00
    } else {
        cxt = $("#cxt").val().trim()
    };
    if ($("#night").val().trim() == '') {
        night = 0.00
    } else {
        night = $("#night").val().trim()
    };
    if ($("#total").val().trim() == '') {
        total = 0.00
    } else {
        total = $("#total").val().trim()
    };

// -------------------------------------------------------
    let aircraftFind
    try {
        aircraftFind = $("#aircraftID").val()//.trim();

        await $.ajax({
            method: "GET",
            url: `/api/aircraft/userFind/${aircraftFind}`
        })
            .then(aircraftId => aircraftFind = aircraftId[0])
            .catch(err => console.error(err.message))
            
        const flightData = {
            UserId: userData.id,

            date: $("#date").val(),
            tailNumber: $("#tailNumber").val().trim(),
            AircraftId: aircraftFind,
            depAir: $("#depAir").val().trim(),
            enrRout: $("#enrRout").val().trim(),
            arrAir: $("#arrAir").val().trim(),
            comments: $("#comments").val().trim(),
            instructor: $("#instructor").val().trim(),
            student: $("#student").val().trim(),
            iap: iap,
            holds: holds,
            landings: landings,
            dayLdg: dayLdg,
            nightLdg: nightLdg,
            total: total,
            cxt: cxt,
            night: night,
            hood: hood,
            imc: imc,
            dualI: dualI,
            cfi: cfi,
            sic: sic,
            pic: pic,
            solo: solo,
        }
        
        if (action == 'create') {
            
            await $.post("/api/flight_time",flightData)
            .catch(console.error)
        } else {
            await $.post(`/api/flight_time/update/${userData.id}/${flightEditId}`,flightData)
            .catch(console.error)
        }
            
    }
    catch (err) {
        console.error(err.message);
    }
    $accordian.empty();
    $('#flextest').empty();
    getFlights(userData.id)
    createFlight();
};

// function for input boxes for create aircraft section
function createAircraft() {

    const generalAircraft = ['', 'aircraftType', 'class', 'numEngine'];

    const generalAircraftLabels = ['General Aircraft Information', 'general', 'Aircraft Type', 'Class (Land or Sea)', 'Number of Engines'];

    createInputLoop(generalAircraft, generalAircraftLabels);

    const generalAircraftBoolean = ['', 'tailWheel', 'complex', 'highPerf', 'turboFan', 'turboProp', 'rotorcraft', 'poweredLift'];

    const generalAircraftBooleanLabels = ['', 'general', 'Tail Wheel', 'Complex', 'High Perf', 'Turbo Fan', 'Turbo Prop', 'Rotorcraft', 'Powered Lift'];

    createInputLoopCheckboxes(generalAircraftBoolean, generalAircraftBooleanLabels);

    const newButton = $("<button>").attr('id', 'create-aircraft-button').text("Add Aircraft")
    $accordian.append(newButton)

    // changes value of checkbox to 1 if it is checked
    const checkbox = $(this);
    $('.aircraft-chkbx').change(function () {
        if (checkbox.prop('checked', 'true')) {
            checkbox.val(1);
        };
    });

    $('#create-aircraft-button').on('click', function (e) {
        e.preventDefault();
        writeAircraft();
    })
};

// function for writing create aircraft fields to the db
function writeAircraft() {
    $('.form-control').each(function () {
        // console.log($(this).attr('class'))
        if ($(this).hasClass('general')) {
            const generalName = $(this).attr('id')
        } else {
            Error();
        };
    });

    $.post("/api/aircraft", {
        userId: userData.id,
        aircraftType: $("#aircraftType").val(),
        class: $("#class").val(),
        numEngine: $("#numEngine").val(),
        tailWheel: $("#tailWheel").val(),
        complex: $("#complex").val(),
        highPerf: $("#highPerf").val(),
        turboFan: $("#turboFan").val(),
        turboProp: $("#turboProp").val(),
        rotorcraft: $("#rotorcraft").val(),
        poweredLift: $("#poweredLift").val()
    })
        .then(result => {
            // console.log(result)
            $('#dyn-form').empty()
            createAircraft()
        })
        .catch(err => console.error(err.responseJSON.parent));

}
// function for getting all flights associated with the logged in user
async function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        // .then(async flights => await displayFlightTimeTable(flights))
        .then(async flights => await displayFlights_FLEX(flights))
        .catch(err => console.error(err));
};

function displayFlights_FLEX(raw_flights) {
    // console.log(raw_flights);
    const TABLE = $("#flextest");

    // map raw_flights data into flights object for column headers and appropriate order
    const flights = raw_flights.map(f => ({
        Date: moment(f.date).format("MM/DD/YY"),
        Aircraft: f['Aircraft.aircraftType'],
        'Tail Number': f.tailNumber,
        'Departure Airport': f.depAir,
        'Enroute Airport(s)': f.enrRout,
        'Arrival Airport': f.arrAir,
        'Flight Number': f.flightNum,
        // 'Departure Time': moment(f.depTime).format("hh:mm A"),
        // 'Arrival Time': moment(f.arrTime).format("hh:mm A"),
        Landings: f.landings,
        'IMC': f.imc,
        Hood: f.hood,
        IAP: f.iap,
        Holds: f.holds,
        PIC: f.pic,
        SIC: f.sic,
        CFI: f.cfi,
        Dual: f.dualI,
        'X-C': f.cxt,
        Solo: f.solo,
        Total: f.total,
        'Day Landings': f.dayLdg,
        Night: f.night,
        'Night Landing': f.nightLdg,
        Instructor: f.instructor,
        Student: f.student
    }));

    // column headers
    const header = $("<div>").addClass('table-row table-header');
    const stickyHeader = $("<div>").addClass('table-row table-header').attr('id', 'sticky').hide();
    // const index = $("<div>").addClass("col").text("#");
    // header.append(index);
    // extract keys from flights as header names
    const headers = Object.keys(flights[0]);
    for (var i = 0; i < headers.length; i++) {
        // create column, add text for our table headers
        const key = $("<div>").addClass("table-col").text(headers[i]);
        const stickyKeys = $("<div>").addClass('table-col').text(headers[i]);
        stickyHeader.append(stickyKeys);
        header.append(key);;
    };
    TABLE.append(header, stickyHeader);

    for (let i = 0; i < flights.length; i++) {
        const row = $("<div>").addClass('table-row');
        row.data("flight", raw_flights[i].id);
        // row.click(clickFlightRow);

        // const index = $("<div>").addClass("col").text(i + 1);
        // row.append(index);

        const keys = Object.keys(flights[0]);
        for (let j = 0; j < keys.length; j++) {

            let col = $("<div>").addClass("table-col");
            const value = flights[i][keys[j]];
            if (value == 0) {
                col = $("<div>").addClass('table-col').text('...')
            } else {
                col = $("<div>").addClass('table-col').text(value); //flights[i] {id:4, date:...}
            };
            row.append(col);
        };
        TABLE.append(row);

        // const hiddenRow = $("<div>").addClass('row hidden-row').css("display", "none").data("flight", raw_flights[i].id);
        // const comments = $("<div>").addClass('col').text("Comments:");
        // const _comments = $("<div>").addClass('col').text(raw_flights[i].comments);

        // hiddenRow.append(comments, _comments);
        // TABLE.append(hiddenRow);

        // edit and delte buttons
        let $button = $("<button>")
            .text("Edit")
            .attr('data-ft-id', raw_flights[i].id)
            .addClass('editButton');
        const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-flight'>")
            .attr('data-ft-id', raw_flights[i].id)
        row.append($button, $delBtn);
        TABLE.append(row);
    };



    // delete button event listener
    $('.delete-flight').click(function (event) {
        const flightDeleteId = $(this).attr('data-ft-id')
        windowScroll =  window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        deleteFlights(flightDeleteId)
    })

    // edit button event listener
    $('.editButton').click(function (event) {
        event.preventDefault();
        flightEditId = $(this).attr('data-ft-id')
        $accordian.empty();
        // $('#create').collapse('toggle')
        createFlight()
        editFlightsAPICall(flightEditId)
        window.scrollTo(0,0)

    })
    window.scrollTo(0,windowScroll)
    windowScroll=0
};

// function clickFlightRow() {
//     const id = $(this).data("flight");
//     $(".hidden-row").each(function (i, element) {
//         if (id === $(element).data("flight")) {
//             // $(this).show();
//             $(this).toggle();
//         }
//         //  else {
//         //     $(this).hide();
//         // };
//     });
// };

// function for displaying all flight times in a table
// function displayFlightTimeTable(flights) {
//     console.log("flights: ", flights) // flights is an array of objects coming back from the db, where each object is 1 flighttime.
//     // console.log("flights Keys: ", Object.keys(flights[0]))

//     // creates an array of names from flight_time table to use as table column names
//     //doing this in html, but saving the code for potential future refactoring
//     // let col = [];
//     // for (let i = 0; i < flights.length; i++) {
//     //     for (const key in flights[i]) {
//     //         if (col.indexOf(key) === -1) {
//     //             col.push(key);
//     //         };
//     //     };
//     // };
//     // console.log(col);

//     // pushing the values from the flgihts object into an array
//     // array to hold flight_time data
//     let data = [];
//     const $tbody = $("#body");
//     let $tr;
//     let $td;
//     for (let i = 0; i < flights.length; i++) {
//         // extract the values from flight_time and push them into data array in order to populate the table
//         $th = $("<th>")
//             .attr("scope", "row")
//             .text([i + 1]);
//         $tr = $("<tr>")
//         for (const values in flights[i]) {
//             // push all the flights data into the array, except for the Aircraft object
//             // if (typeof flights[i][values] !== "object") {
//             //     data.push(flights[i][values])
//             //     // push the first 32 indeces of the array into a new array
//             //     //
//             // };
//             // console.log("flights at i .id: ",flights[i].id)
//             if (flights[i][values] == 0) {
//                 $td = $("<td>").text('')
//             } else {
//                 $td = $("<td>").text(flights[i][values]); //flights[i] {id:4, date:...}
//             }
//             $tr.append($td)
//         };

//         let $button = $("<button>")
//             .text("Edit")
//             .attr('data-ft-id', flights[i].id)
//             .addClass('editButton');
//         const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-flight'>")
//             .attr('data-ft-id', flights[i].id)
//         $tr.append($button, $delBtn);
//         $tbody.append($th, $tr);

//         // pushing the values from the aircraft object into an array
//         let aircraftValues = []
//         for (const values in data[32]) {
//             // console.log("DATA32VALUES: ", data[32][values])
//             aircraftValues.push(data[32][values])
//         };
//         // console.log(data[32].id)
//         // console.log("Aircraft Values: ", aircraftValues)
//     };
// };


async function editFlightsAPICall(flightId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userData.id}/${flightId}`
    })
        .then(flight => insertFlightTimetoEdit(flight))
        .catch(err => console.error(err));
};


// Manually putting in each of the flight time values into the input boxes.
function insertFlightTimetoEdit(flight) {
    // console.log(flight)
    // $('.form-control').each(function(){
    //     console.log($(this).attr('id'))
    // })
    $("#date").val(flight[0].date);
    $("#tailNumber").val(flight[0].tailNumber);
    aircraftDropDown.set(flight[0].Aircraft.aircraftType)
    $("#aircraftID").val('TEst');
    $("#depAir").val(flight[0].depAir);
    $("#enrRout").val(flight[0].enrRout);
    $("#arrAir").val(flight[0].arrAir);
    $("#comments").val(flight[0].comments);
    $("#instructor").val(flight[0].instructor);
    $("#student").val(flight[0].student);
    $("#iap").val(flight[0].iap);
    $("#holds").val(flight[0].holds);
    $("#landings").val(flight[0].landings)
    $("#dayLdg").val(flight[0].dayLdg)
    $("#nightLdg").val(flight[0].nightLdg)
    $("#total").val(flight[0].total)
    $("#cxt").val(flight[0].cxt)
    $("#night").val(flight[0].night)
    $("#hood").val(flight[0].hood)
    $("#imc").val(flight[0].imc)
    $("#dualI").val(flight[0].dualI)
    $("#cfi").val(flight[0].cfi)
    $("#pic").val(flight[0].pic)
    $("#sic").val(flight[0].sic)
    $("#solo").val(flight[0].solo)

    $('#createFlightButton').text('Edit Flight')
};

var windowScroll
// To delete flights function
async function deleteFlights(deleteId) {
    $("#flextest").empty();
    $.ajax({
        method: "DELETE",
        url: `/api/flight_time/delete/${userData.id}/${deleteId}`
    })
        .then(await getFlights(userData.id))
        .catch(err => console.error(err));
};

function callTotals() {
    $.ajax({
        method: "GET",
        url: `/api/flight_times/totals/${userData.id}`
    })
        .then(results => {
            printTotals(results)
        })
        .catch(err => console.error(err));
}

function printTotals(raw_totals) {
    const TABLE = $("#dyn-form");
    const totals = raw_totals.map(f => ({
        'Cross Country': f.cxt,
        Night: f.night,
        'IMC': f.imc,
        'Simulated Instrument': f.hood,
        'Instrument Approaches': f.iap,
        Holds: f.holds,
        'Day Landings': f.dayLdg,
        'Night Landing': f.nightLdg,
        Solo: f.solo,
        Dual: f.dualI,
        PIC: f.pic,
        SIC: f.sic,
        CFI: f.cfi,
        Total: f.total,
    }));

    const totalRow1 = $("<div>").addClass('row');
    const totalRow2 = $("<div>").addClass('row');
    const headers = Object.keys(totals[0]);
    const values = Object.values(totals[0])
    for (var i = 0; i < headers.length; i++) {
        const divCont = $("<div>").addClass('totalList')
        const key = $('<li>').addClass('totalList').text(headers[i])
        const valueRow = $('<li>').addClass('totalList').text(values[i])
        divCont.append(key, valueRow)
        if (i < 8) {
            // key.append(valueRow)
            // totalRow1.append(key,valueRow)
            totalRow1.append(divCont)
        } else {
            // key.append(valueRow)
            // totalRow2.append(key)
            totalRow2.append(divCont)
        }
        ;
    };
    TABLE.append(totalRow1, totalRow2);
}