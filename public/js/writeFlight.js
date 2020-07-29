// Used to make all of the input boxes for the create flight section
function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments', 'instructor', 'student']
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'Arrival Airports', 'Comments', 'Instructor', 'Student']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = [0, 'iap', 'holds', 'landings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Approaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
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
    // let writeFlightArray =[]
    //    $('.form-control').each(function(){
    //     if ($(this).hasClass('app')) {
    //         let appName = $(this).attr('id')
    //         if ($('#'+appName).val().trim()==''){
    //             var objectItem = {appName: 0.00}
    //         } else {
    //             var objectItem = {appName: $('#'+appName).val().trim()}
    //         };
    //         writeFlightArray.push(objectItem)
    //     }
    //             Error();
    //     });

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
            await $.post(`/api/flight_time/update/${userData.id}/${flightId}`,flightData)
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