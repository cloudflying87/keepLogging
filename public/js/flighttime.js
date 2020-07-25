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

$('#createFlightButton').on('click', function (e) {
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
function writeFlightTime() {

}










































// function for getting all flights associated with the logged in user
function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        .then(async flights => await displayFlightTimeTable(flights))
        .catch(err => console.error(err));
};

// function for displaying all flight times in a table
function displayFlightTimeTable(flights) {
    // console.log(flights)

    // creates an array of names from flight_time table to use as table column names
    // let col = [];
    // for (let i = 0; i < flights.length; i++) {
    //     for (const key in flights[i]) {
    //         if (col.indexOf(key) === -1) {
    //             col.push(key);
    //         };

    //     };
    // };
    // console.log(col);

    //TODO: create another for in loop to grab the values of those keys, and then add those to the table with another for loop, similar to the one below.
    // pushing the values from the flgihts object into an array
    // array to hold flight_time data
    let data = [];
    const $tbody = $("#body");
    let $tr;
    let $td;
    for (let i = 0; i < flights.length; i++) {
        // extract the values from flight_time and push them into data array in order to populate the table
        for (const values in flights[i]) {
            // push all the flights data into the array, except for the Aircraft object
            if (typeof flights[i][values] !== "object") {
                data.push(flights[i][values])
            };
        };

        // make a number of rows in the table equal to the number of flights
        $tr = $("<tr>")
        $th = $("<th>").attr("scope", "row").text([i + 1]);
        $td = $("<td>");
        $tr.append($td)
        $tbody.append($th, $tr);
        // data.forEach(e => {
        //     $td = $td.text(e)
        //     console.log("e: ", e)
        // })
    };

    // console.log("data", data)

    // pushing the values from the aircraft object into an array
    let aircraftValues = []
    for (const values in data[32]) {
        // console.log("DATA32VALUES: ", data[32][values])
        aircraftValues.push(data[32][values])
    }
    // console.log(data[32].id)
    // console.log("Aircraft Values: ", aircraftValues)


    // making the table
    // for (let i = 1; i < data.length; i++) {
    //     console.log("data: ", data[i], i)
    //     const $td = $("<td>");
    //     $td.text(data[i])
    //     $tr = $tr.append($td);
    //     $tbody.append($tr)

    // };

};