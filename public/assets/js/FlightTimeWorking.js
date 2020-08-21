// Used to make all of the input boxes for the create flight section
// Distance calculation used from https://github.com/mwgg/GreatCircle

function createFlightWorking() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'route', 'deptTime', 'arrTime', 'comments', 'instructor', 'student'];
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Route', 'Departure Time', 'Arrival Time', 'Comments', 'Instructor', 'Student'];
    createInputLoop(generalFlight, generalFlightInfo);
    // -----------------------------------------------
    


    //----------------------------------------
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
// Sets the current date into the date box, can be changed by the user but gives them a place to start. 
const setDate = new Date()
    const currentDateSet = (setDate.getMonth()+1)+'/'+setDate.getDate()+'/'+setDate.getFullYear()
    document.getElementById('date').value = currentDateSet

let airportLoc = []
let distNum = []
let sunTimesArr = []
let crossCountry = false
let timeCalc
// This starts the async function for finding the lat/long for the airports and starts calculating the times. 
    $("#calcTimes").click(async function (event) {
        event.preventDefault();
        // if (document.getElementById('route').value === '') {
        //     alert("Enter Route before calculating times")
        //     return
        // }
        airportLoc = []
        distNum = []
        sunTimesArr = []
        await workingTimes();
        await findDistance();
        await calcTime();
        
    });
// Here we split the route box up into as many airports as there are there. We then run a loop to get lat/long for each one of them with a API call to our airport database. 
async function workingTimes() {
    const route = document.getElementById('route').value
    let eachAirport = route.split(' ')
    for (let i = 0; i < eachAirport.length; i++) {
        await getLatLong(eachAirport[i])
    }
}

// Calculates the distance between the airports from above. Will calculate all of the distances and sets Cross country to true if it is over 50nm. 
async function findDistance() {
    let y = -1;
    
    for(let i=0; i<airportLoc.length/2; i+=2 ){
        y++
        distance(airportLoc[i],airportLoc[i+1],airportLoc[i+2],airportLoc[i+3])
        if (distNum[y]>50){
            crossCountry = true
        }   
    }
}
// This is our API call from our aiports table
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
// we do all the math for the distance calculation between two points
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

// Calculates total time from the clock times that are input in the time boxes. If no date is entered than todays date is assumed. 
async function calcTime (){
    let departTimeDateAdd = false
    let arrTimeDateAdd = false
    const userDate = new Date((document.getElementById('date').value));
    let departTimeDate = '';
    let arrTimeDate = '';
    const departTime = (document.getElementById('deptTime').value);
    const arrTime = (document.getElementById('arrTime').value);
    
    // Here we are checking if the user just input a time. If that is true then we take the date from the date box and put it in from of the time. We are using the newDate to format it as a date correctly to work with. 
    if (new Date(departTime)=='Invalid Date'){
        departTimeDate = new Date((userDate.getUTCMonth()+1)+'/'+userDate.getUTCDate()+'/'+userDate.getUTCFullYear()+' '+departTime+":00Z")
        departTimeDateAdd = true
    }else {
        departTimeDate = new Date(departTime+':00Z')
    }
    
    if (new Date(arrTime)=='Invalid Date'){
        arrTimeDate = new Date(((userDate.getUTCMonth()+1)+'/'+userDate.getUTCDate()+'/'+userDate.getUTCFullYear()+' '+arrTime+":00Z"))
        arrTimeDateAdd = true
    }else {
        arrTimeDate = new Date(arrTime+':00Z')
    }
// Subtracting the times in milliseconds. 
    timeCalc = convertToHoursMM(arrTimeDate.getTime()-departTimeDate.getTime())
    
    // Auto filling times. Will add more as we have user preferences. 
    document.getElementById('total').value = timeCalc
    if (crossCountry === true){
        document.getElementById('cxt').value = timeCalc
    }
    // Filling the departure box back in so the user can see what date was used from their calculations
    if (departTimeDateAdd){
        (document.getElementById('deptTime').value) = (departTimeDate.getUTCMonth()+1)+'/'+departTimeDate.getUTCDate()+'/'+departTimeDate.getUTCFullYear()+' '+departTime
    }
    // filling the arrival time back in
    if (arrTimeDateAdd){
        (document.getElementById('arrTime').value) = (arrTimeDate.getUTCMonth()+1)+'/'+arrTimeDate.getUTCDate()+'/'+arrTimeDate.getUTCFullYear()+' '+arrTime
    }
    nighttimeGather(departTimeDate,arrTimeDate)
    
}

//------------------------------------
async function nighttimeGather (depart, arrive){
    let nightTime
    // Getting the departure airport suntimes dawn, sunrise, sunset, dusk pushing them into an array.
    // always going to take the first airport and the last airport. Getting the last airport by finding the length of the array and taking the last two items. 
    // all calculations are done on sunrise and sunset times. Carrying dawn times but not using them for anything right now. 
    const numofAirport = airportLoc.length
    await sunTimes(depart,airportLoc[0],airportLoc[1])
    await sunTimes(arrive,airportLoc[numofAirport-2],airportLoc[numofAirport-1])
    let depRise = sunTimesArr[1]
    let depSet = sunTimesArr[2]
    let arrRise = sunTimesArr[5]
    let arrSet = sunTimesArr[6]

    if (depart<depRise&&arrive<arrRise|| depart>depSet&&arrive>arrSet){
        // this is for an all night flight before sunrise or after sunset
        nightTime = timeCalc
    }else if (depart<depRise&&arrive>arrRise){ 
        //this is for an early morning departure before the sunrises
        nightTime = convertToHoursMM(depRise-depart)
    }else if (depart<depSet&&arrive>arrSet){
        // evening flight departure before sunset and landing after sunset
        nightTime = convertToHoursMM(arrive-arrSet)
    } else {
        nightTime = 0
    }

    document.getElementById('night').value = nightTime
}
async function sunTimes(date,lat,long){
    await $.ajax({
        method: "GET",
        url: `/api/nighttime?date=${date}&lat=${lat}&long=${long}`
    })
    .then( ({sunrise,sunset, dawn,dusk}) => {
        let dawnCalc = moment.utc(dawn)
        let sunriseCalc = moment.utc(sunrise)
        let sunsetCalc = moment.utc(sunset)
        let duskCalc = moment.utc(dusk)

        sunTimesArr.push(dawnCalc,sunriseCalc,sunsetCalc,duskCalc)})
        
}

function convertToHoursMM (diff){
    // Converting the time back to hours and minutes in a decimal form. 
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = (msec / 1000 / 60 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    // Limiting it to 2 decimal places. 
    return (hh+mm).toFixed(2)
}
function convertDateToString (date,time){
//     console.log(date)
//     let month = 0
//     let day = 0
//     let year = date.getUTCFullYear()
//     let monthC = date.getUTCMonth()+1
//     let dayC = date.getUTCDate()
    
//     if (monthC <10) {
//         month = '0'+monthC
//     } else{
//         month = monthC
//     }

//     if(dayC <10) {
//         day = '0'+dayC
//     } else {
//         day = dayC
//     }
//     if (!time){
//         return new Date((year+'-'+month+'-'+day+' '+date.getUTCHours()+':'+date.getUTCMinutes()+":00Z"))
//     } else {
//         return new Date((year+'-'+month+'-'+day+' '+time+":00Z"))
//     }
    
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

