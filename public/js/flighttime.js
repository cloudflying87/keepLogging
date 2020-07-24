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
    createFlight();
});

$('#createFlightButton').on('click',function(e){
    e.preventDefault();
    writeFlightTime();
})

function createInputLoop(arr1, arr2) {
    $accordian.append('<p>', arr2[0])
    for (let i = 1; i < arr1.length; i++) {
        const $input = $(`<input class='form-control placeholder='${arr1[0]}'>`);
        const $label = $("<label>")
        $input.attr('id', arr1[i])
        $label.text(arr2[i])
        $accordian.append($label, $input)
    };
}

function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments']
    const generalFlightInfo = ['General Flight Information', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'ArrivalAirports', 'Comments']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = ['0', 'approach', 'holds', 'totalLandings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Aproaches and Landings', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
    createInputLoop(approachLanding, approachLandingInfo)
    // Times
    const flightTimesIds = ['0.00', 'total', 'cxt', 'night', 'hood', 'imc', 'dual', 'cfi', 'sic', 'pic']
    const flightTimesidsLabel = ['Flight Times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual (Instruction Recieved)', 'CFI (Instructor)', 'SIC (Second in Command)', 'PIC (Pilot in Command)']
    createInputLoop(flightTimesIds, flightTimesidsLabel)

    const newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight")
    $accordian.append(newButton)

};
function writeFlightTime(){

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