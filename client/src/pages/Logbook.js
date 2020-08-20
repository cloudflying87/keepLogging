import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Nav from '../components/Nav/index';
import AddFlightForm from '../components/AddFlightForm/index';
import Table from '../components/Table/index';
import Modal from '../components/Modal/index';
import TotalsDisplay from '../components/TotalsDisplay/index';
import API from '../utils/API';

import './logbook.css'


const Logbook = () => {

    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        fullResults: []
    })
    const [logbookForm, setlogbookForm] = useState({})
    const [workingState, setWorkingState] = useState({})
    const [timeDistance, settimeDistance] = useState({
        airports: '',
        depTime:'',
        arrivalTime:'',
        date:'',
        airportArray: [],
        airportLoc: [],
        distNum: [],
        sunTimesArr: [],
        crossCountry: false,
        departTimeDateAdd: false,
        arrTimeDateAdd: false,
        departTimeDate: '',
        arrTimeDate: '',
        timeCalc:'',
    })
    const [modal, setModal] = useState({
        open: false,
        values: []
    });

    useEffect(() => {
        API.getFlights()
            .then((res) => {
                console.log(res)
                setState(({
                    ...state,
                    fullResults: res.data
                }))
            })
            .catch(err => {
                console.log(err)
                window.location.href = '/'
            })
    }, [])

    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
    };

    const handleFormInput = ({ target: { value, name } }) => {
        setlogbookForm(logbookForm => ({
            ...logbookForm,
            // date: new Date(),
            [name]: value

        }))
        updatingFormState()
    };
    const updatingFormState = () => {
        settimeDistance(timeDistance => ({
            ...timeDistance,
            date: logbookForm.date,
            airports: logbookForm.route,
            depTime: logbookForm.departureTime,
            arrivalTime: logbookForm.arrivalTime

        }))
    }
    const dateSet = () => {
        const dateWorking = new Date()
        let dateCur = (dateWorking.getFullYear()+'-'+(dateWorking.getMonth()+1) +'-'+dateWorking.getDate())
        return dateCur
    }

    let airportLoc = []
    const workingTimeDistance = async (e) => {
        updatingFormState()
        e.preventDefault();
        await workingTimes();
        await findDistance();
        await calcTime();
    }

    const workingTimes = async () => {
        const routeDist = logbookForm.route
        settimeDistance(timeDistance => ({
            ...timeDistance,
            airportArray: timeDistance.airports.split(' ')
        }))
        const eachAirport = timeDistance.airportArray
        for (let i = 0; i < eachAirport.length; i++) {
            await getLatLong(eachAirport[i])
        }
        console.log(timeDistance)
    }

    async function getLatLong(icao) {
        await API.getAirports(icao)
            .then(async ({ data }) => {
                setWorkingState(data)
                const objectArray = Object.values(data[0])
                settimeDistance({
                    ...timeDistance,
                    airportLoc: [timeDistance.airportLoc.push(objectArray[8], objectArray[9])]
                })
            })
            .catch(console.error)

    }

    const findDistance = async () => {
        let y = -1;
        let airportLoc = timeDistance.airportLoc
        
        let distNum = timeDistance.distNum
        for (let i = 0; i < airportLoc.length / 2; i += 2) {
            y++
            distance(airportLoc[i], airportLoc[i + 1], airportLoc[i + 2], airportLoc[i + 3])
            if (distNum[y] > 50) {
                settimeDistance({
                    ...timeDistance,
                    crossCountry: true
                })
                 
            }
        }
    }
    const distance = async (lat1, lon1, lat2, lon2) => {
        var r = 3440.070
        lat1 *= Math.PI / 180;
        lon1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        lon2 *= Math.PI / 180;
        var lonDelta = lon2 - lon1;
        var a = Math.pow(Math.cos(lat2) * Math.sin(lonDelta) , 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta) , 2);
        var b = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
        var angle = Math.atan2(Math.sqrt(a) , b);
        settimeDistance({
            ...timeDistance,
            distNum: [...timeDistance.distNum, timeDistance.distNum.push(angle * r)]
        })
        setlogbookForm()
        
    }

// Calculates total time from the clock times that are input in the time boxes. If no date is entered than todays date is assumed. 
const calcTime = async () => {
    
    const userDate = new Date(timeDistance.date);
    
    const departTime = (timeDistance.depTime);
    const arrTime = (timeDistance.arrivalTime);
    
    // Here we are checking if the user just input a time. If that is true then we take the date from the date box and put it in from of the time. We are using the newDate to format it as a date correctly to work with. 
    if (new Date(departTime)=='Invalid Date'){
        settimeDistance({
            ...timeDistance,
            departTimeDate: new Date(((userDate.getUTCMonth()+1)+'/'+userDate.getUTCDate()+'/'+userDate.getUTCFullYear()+' '+departTime+":00Z")),
            departTimeDateAdd:true
        })
        
    }else {
        settimeDistance({
            ...timeDistance,
            departTimeDate: new Date(departTime+':00Z'),
        })
    }
    
    if (new Date(arrTime)=='Invalid Date'){
        settimeDistance({
            ...timeDistance,
            arrTimeDate: new Date(((userDate.getUTCMonth()+1)+'/'+userDate.getUTCDate()+'/'+userDate.getUTCFullYear()+' '+arrTime+":00Z")),
            arrTimeDateAdd:true
        })
    }else {
        settimeDistance({...timeDistance,arrTimeDate: new Date(arrTime+':00Z')})
    }
// Subtracting the times in milliseconds. 
    settimeDistance({...timeDistance,timeCalc: convertToHoursMM(timeDistance.arrTimeDate.getTime()-timeDistance.departTimeDate.getTime())})
    
    // Auto filling times. Will add more as we have user preferences. 
    document.getElementById('total').value = timeCalc
    if (timeDistance.crossCountry === true){
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
const nighttimeGather = async (depart, arrive) => {
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

    const logFlight = (e) => {
        e.preventDefault()
        API.createFlight({
            date: logbookForm.date,
            route: logbookForm.route,
            comments: logbookForm.comments,
            flightNum: logbookForm.flightNumber,
            depTime: logbookForm.departureTime,
            arrTime: logbookForm.arrivalTime,
            landings: logbookForm.landings,
            approach: logbookForm.approach,
            hold: logbookForm.hold,
            dayLandings: logbookForm.dayLandings,
            nightLandings: logbookForm.nightLandings,
            total: logbookForm.total,
            crossCountry: logbookForm.crossCountry,
            night: logbookForm.night,
            imc: logbookForm.imc,
            hood: logbookForm.hood,
            pic: logbookForm.pic,
            sic: logbookForm.sic,
            cfi: logbookForm.cfi,
            dual: logbookForm.dual,
            solo: logbookForm.solo,
        })
            .then((data) => console.log('Success'))
            .catch(console.error)
    }
    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
                return (
                    <>
                        <AddFlightForm
                            handleFormInput={handleFormInput}
                            handleAddFlight={logFlight}
                            workingTimeDistance={workingTimeDistance}
                            handleAddFlight={displayState}
                        />
                    </>
                )
                break;
            case 'totalsBtn':
                return (
                    <>
                        <TotalsDisplay />
                    </>
                )
            default:
                return null;
                break;
        };
    };

    const openModal = e => {
        const { target } = e;
        e.preventDefault();
        setModal(prevModal => ({
            ...prevModal,
            open: !modal.open,
            values: state.fullResults.find(x => parseInt(x.id) === parseInt(target.id))
        }))
        console.log(modal)
        console.log(state)
    };

    return (
        <div>
            {/* {console.log(timeDistance)} */}
            {
                (modal.open && !!modal.values) &&
                
                <Modal
                    key={modal.values.id}
                    results={modal.values}
                    handleClick={e => {
                        e.preventDefault();
                        setModal(state => ({
                            ...state,
                            open: !modal.open
                        }))
                    }}
                />

            }
            <Nav />
            <div className='menuDiv'>
                {/* here will be the buttons for this page. Maybe i'll make a component for these since there will be one on each page. */}
                <Button
                    text='Add Flight'
                    btnId='addFlightBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                    }}
                />
                <Button
                    text='Search'
                    btnId='searchBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState({
                            open: !state.open,
                            btnClicked: target.id
                        })
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Totals'
                    btnId='totalsBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Training'
                    btnId='training'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Logout'
                    btnId='logout'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("logout")
                        console.log(state.btnClicked)
                        API.userLogOut()
                            .then(window.location.href = "/")
                            .catch(err => console.error(err))
                    }}
                />
            </div>
            <div className='formDiv'>
                {
                    !state.open
                        ? null
                        : (
                            switchFunc(state.btnClicked)
                        )
                }
            </div>
            <main>
                <Table
                    openModal={openModal}
                />
                {/* Modal for popping out table. maybe a 'view' button opens and closes it */}
                {/* The table will live here. Might try to do an actual table first, then will try grid or flexbox. */}
            </main>

        </div>
    )
}

export default Logbook;