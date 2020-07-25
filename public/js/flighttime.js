const $div = $("<div>");
const $accordian = $("#dyn-form");
let userData = {};

// onload, make an api call to /api/user_data that will return a json object with their email and id. store this as a global object. then call getFlights()
$(document).ready(async function () {
    await $.ajax({
        method: "GET",
        url: "/api/user_data"
    })
        .then(result => {
            userData = result;
            console.log(userData)
        })
        .catch(err => console.error(err));

    await getFlights(userData.id);
});

$("#create-flight").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();
    createFlight();
});

function createInputLoop(arr1, arr2) {
    $accordian.append('<p>', arr2[0])
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input class=form-control>');
        const $label = $("<label>");
        $input.attr('id', arr1[i]);
        $input.attr('placeholder', arr1[0]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i+1]);
        $accordian.append($label, $input)
    };
}
// Used to make all of the input boxes for the create flight section 
function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments']
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'ArrivalAirports', 'Comments']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = [0, 'approach', 'holds', 'totalLandings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Aproaches and Landings','app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
    createInputLoop(approachLanding, approachLandingInfo)
    // Times
    const flightTimesIds = [0.00, 'total', 'cxt', 'night', 'hood', 'imc', 'dual', 'cfi', 'sic', 'pic']
    const flightTimesidsLabel = ['Flight Times','times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual (Instruction Recieved)', 'CFI (Instructor)', 'SIC (Second in Command)', 'PIC (Pilot in Command)']
    createInputLoop(flightTimesIds, flightTimesidsLabel)

    const newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight")
    $accordian.append(newButton)
    
    $("#createFlightButton").click(function (event){
        event.preventDefault();
        writeFlightTime();
    })
};

function writeFlightTime(){
    const NULL = null
   $('.form-control').each(function(){
        console.log($(this).attr('class'))
    if ($(this).hasClass('general')) {
        const generalName = $(this).attr('id')
    }
            Error();
    });

    if ($("#imc").val().trim()==''){
        imc = 0.00
    } else {
        imc = $("#imc").val().trim()
    };
    if ($("#hood").val().trim()==''){
        hood = 0.00
    } else {
        hood = $("#hood").val().trim()
    };
    if ($("#holds").val().trim()==''){
        holds = 0
    } else {
        holds = $("#holds").val().trim()
    };
    if ($("#pic").val().trim()==''){
        pic = NULL
    } else {
        pic = $("#pic").val().trim()
    };
    if ($("#sic").val().trim()==''){
        sic = 0.00
    } else {
        sic = $("#sic").val().trim()
    };
    if ($("#dual").val().trim()==''){
        dual = 0.00
    } else {
        dual = $("#dual").val().trim()
    };
    if ($("#cfi").val().trim()==''){
        cfi = 0.00
    } else {
        cfi = $("#cfi").val().trim()
    };
    if ($("#cxt").val().trim()==''){
        cxt = 0.00
    } else {
        cxt = $("#cxt").val().trim()
    };
    if ($("#night").val().trim()==''){
        night = 0.00
    } else {
        night = $("#night").val().trim()
    };
    if ($("#total").val().trim()==''){
        total = 0.00
    } else {
        total = $("#total").val().trim()
    };
    if ($("#approach").val().trim()==''){
        approach = 0.00
    } else {
        approach = $("#approach").val().trim()
    };
    if ($("#totalLandings").val().trim()==''){
        totalLandings = 0.00
    } else {
        totalLandings = $("#totalLandings").val().trim()
    };
    if ($("#dayLdg").val().trim()==''){
        dayLdg = 0.00
    } else {
        dayLdg = $("#dayLdg").val().trim()
    };
    if ($("#nightLdg").val().trim()==''){
        nightLdg = 0.00
    } else {
        nightLdg = $("#nightLdg").val().trim()
    };
    $.post("/api/flight_time", {
        UserId: userData.id,
        
        date: $("#date").val(),
        tailNumber: $("#tailNumber").val().trim(),
        AircraftID: $("#aircraftID").val().trim(),
        depAir: $("#depAir").val().trim(),
        enrRout: $("#enrRout").val().trim(),
        arrAir: $("#arrAir").val().trim(),
        comments: $("#comments").val().trim(),
        approach: approach,
        holds: holds,
        totalLandings: totalLandings,
        dayLdg: dayLdg,
        nightLdg: nightLdg,
        total: total,
        cxt: cxt,
        night: night,
        hood: hood,
        imc: imc,        
        dual: dual,
        cfi: cfi,
        sic: sic,
        pic: pic,
    })

    .then(function() { result =>
        console.log(result)
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err.responseJSON.parent)
      });
    
}
function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        .then(flights => {

            for (const property in flights) {
                // console.log(flights[property])
                // const $p = $("<p>").text(JSON.stringify(flights[property].property));
                // $("#flight-times").append($p);

            }
        })
        .catch(err => console.error(err));

};