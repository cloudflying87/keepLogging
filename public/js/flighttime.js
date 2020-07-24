const $div = $("<div>");
const $accordian = $("#dyn-form");
let userData = {};

$("#create-flight").on("click", function (e) {
    e.preventDefault();
    createFlight();
});



// imc,hood,iap,holds,AircraftId,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student,createdAt,updatedAt
function createFlight() {
    //General Flight Info
    const generalFlight = ['date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments']
    const generalFlightInfo = ['Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'ArrivalAirports', 'Comments']

    $accordian.append('<p>', "General Flight Information")
    for (let i = 0; i < generalFlight.length; i++) {
        const $input = $("<input class='form-control' placeholder='0'>");
        const $label = $("<label>")
        $input.attr('id', generalFlight[i])
        $label.text(generalFlightInfo[i])
        $accordian.append($label, $input)
    };

    // Landings and Approaches
    const approachLanding = ['approach', 'holds', 'totalLandings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']

    $accordian.append('<p>', "Landings and Approaches")
    for (let i = 0; i < approachLanding.length; i++) {
        const $input = $("<input class='form-control' placeholder='0'>");
        const $label = $("<label>")
        $input.attr('id', approachLanding[i])
        $label.text(approachLandingInfo[i])
        $accordian.append($label, $input)
    };
    // Times
};



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


function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        .then(flights => {
            let allFlights = [...flights];
             console.log(allFlights)
        })
        .catch(err => console.error(err));
};