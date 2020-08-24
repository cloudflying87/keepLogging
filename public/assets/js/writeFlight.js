// Used to make all of the input boxes for the create flight section
function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments', 'instructor', 'student'];
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'Arrival Airports', 'Comments', 'Instructor', 'Student'];
    createInputLoop(generalFlight, generalFlightInfo);
    // Landings and Approaches
    const approachLanding = [0, 'iap', 'holds', 'landings', 'dayLdg', 'nightLdg'];
    const approachLandingInfo = ['Approaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing'];
    createInputLoop(approachLanding, approachLandingInfo);
    // Times
    const flightTimesIds = ['0.00', 'total', 'cxt', 'night', 'hood', 'imc', 'dualI', 'cfi', 'sic', 'pic', 'solo'];
    const flightTimesidsLabel = ['Flight Times', 'times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual I', 'CFI', 'SIC', 'PIC', 'Solo'];
    createInputLoop(flightTimesIds, flightTimesidsLabel);
    const newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight");
    $accordian.append(newButton);

    $("#createFlightButton").click(function (event) {
        event.preventDefault();

        if ($('#createFlightButton').text() == 'Add Flight') {
            writeFlightTime('create');
        } else {
            writeFlightTime('edit');
        };

    });
    $("#addAircraftShortcut").click(function (event) {
        event.preventDefault();
        $('#dyn-form').empty();
        createAircraft();
    })

    for (let i = 0; i < aircraftDropDownValues.length; i++) {
        let options = $('<option>').text(aircraftDropDownValues[i]).attr('value', aircraftDropDownValues[i])
        $('#aircraftID').append(options);
    }
    aircraftDropDown = new SlimSelect({
        select: '#aircraftID'
    });
};

// The post route to create a new flight record. Reading from the input boxes and then sending to the database. Converting the aircraftID to a number with a get route.
async function writeFlightTime(action) {
    let flightData = {};
    flightData["UserId"] = userData.id;
    $('.form-control').each(function (index, element) {
        if (element.classList.contains('app') || element.classList.contains('times')) {
            if ($('#' + element.id).val().trim() === "") {
                flightData[element.id] = 0.00;
            } else {
                flightData[element.id] = $('#' + element.id).val().trim();
            };
        } else if (element.classList.contains('general')) {
            if ($('#' + element.id).val().trim() == '') {
                flightData[element.id] = '';
            } else {
                flightData[element.id] = $('#' + element.id).val().trim();
            };
        };
    });

    let aircraftFind;
    try {
        aircraftFind = $("#aircraftID").val()//.trim();

        await $.ajax({
            method: "GET",
            url: `/api/aircraft/userFind/${aircraftFind}`
        })
            .then(async aircraftId => flightData["AircraftId"] = await aircraftId[0])
        if (action == 'create') {
            console.log(flightData)
            await $.post("/api/flight_time", (flightData))
        } else {
            await $.post(`/api/flight_time/update/${userData.id}/${flightId}`, flightData)
        }
    }
    catch (err) {
        console.error(err);
    };
    $accordian.empty();
    $('#flextest').empty();
    getFlights(userData.id);
    createFlight();
};