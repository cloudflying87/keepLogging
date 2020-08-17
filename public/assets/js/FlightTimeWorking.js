// Used to make all of the input boxes for the create flight section
// Distance calculation used from https://github.com/mwgg/GreatCircle
function createFlightWorking() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'route', 'deptTime', 'arrTime', 'comments', 'instructor', 'student'];
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Route', 'Departure Time', 'Arrival Time', 'Comments', 'Instructor', 'Student'];
    createInputLoop(generalFlight, generalFlightInfo);
    // Landings and Approaches
    const approachLanding = [0, 'iap', 'holds', 'landings', 'dayLdg', 'nightLdg'];
    const approachLandingInfo = ['Approaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing'];
    createInputLoop(approachLanding, approachLandingInfo);
    let newButton = $("<button>").attr('id', 'calcTimes').text("CalcTimes");
    $accordian.append(newButton);
    // Times
    const flightTimesIds = ['0.00', 'total', 'cxt', 'night', 'hood', 'imc', 'dualI', 'cfi', 'sic', 'pic', 'solo'];
    const flightTimesidsLabel = ['Flight Times', 'times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual I', 'CFI', 'SIC', 'PIC', 'Solo'];
    createInputLoop(flightTimesIds, flightTimesidsLabel);
    newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight");
    $accordian.append(newButton);
// --------------------------------------
let airportLoc = []
let distNum = []
    $("#calcTimes").click(async function (event) {
        event.preventDefault();
        airportLoc = []
        distNum = []
        await workingTimes();
        await findDistance();
        
    });

async function workingTimes() {
    const route = document.getElementById('route').value
    let eachAirport = route.split(' ')
    for (let i = 0; i < eachAirport.length; i++) {
        await getLatLong(eachAirport[i])
    }
    // return airportLoc
}

async function findDistance() {
    let y = 0;
    let crossCountry = false
    for(let i=0; i<airportLoc.length/2; i+=2 ){
        y++
        distance(airportLoc[i],airportLoc[i+1],airportLoc[i+2],airportLoc[i+3])
        
        if (distNum[y]>50){
            crossCountry = true
        }   
    }
    console.log(crossCountry)
    console.log(distNum)
}

async function getLatLong(icao) {
        await $.ajax({
        method: "GET",
        url: `/api/airports/${icao}`
    })
    .then(icao => {
        icao.map(x => {
            airportLoc.push(parseFloat(x.latitude,10), parseFloat(x.longitude,10))
        })
    })
}
async function distance(lat1, lon1, lat2, lon2) {
    var r = 3440.070
    lat1 *= Math.PI / 180;
    lon1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lon2 *= Math.PI / 180;
    var lonDelta = lon2 - lon1;
    var a = Math.pow(Math.cos(lat2) * Math.sin(lonDelta) , 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta) , 2);
    var b = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
    var angle = Math.atan2(Math.sqrt(a) , b);
    distNum.push(angle * r)
}
// --------------------------------------
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

/*
async function findDistance(){
    try {
      const airportLatsnLongs = await workingTimes()
      const calcDistance = await findDistance()
    } catch{
        console.error
    }
}
let distanceP = new Promise((resolve,reject) =>{
    const route = document.getElementById('route').value
    let eachAirport = route.split(' ')

})
async function workingTimes() {
    
    for (let i = 0; i < eachAirport.length; i++) {
        getLatLong(eachAirport[i])
    }
    return airportLoc
}

*/