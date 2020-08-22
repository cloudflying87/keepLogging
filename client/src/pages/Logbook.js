import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Nav from '../components/Nav/index';
import AddFlightForm from '../components/AddFlightForm/index';
import Table from '../components/Table/index';
import Modal from '../components/Modal/index';
import TotalsDisplay from '../components/TotalsDisplay/index';
import API from '../utils/API';
import UserContext from '../utils/UserContext';
import moment from 'moment'

import './logbook.css'

let airportLoc = [];
let distNum = [];
let crossCountryTrue = false;
const Logbook = () => {

    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        fullResults: [],
        mapped: [],
        totals: [],
        // userId: ''
    })
    const [logbookForm, setlogbookForm] = useState({
        date: moment().format('YYYY-MM-D'),
        total: '',
        crossCountry: '',
        night: '',
        arrTime: '',
        depTime: '',
        cfi: '',
        comments: '',
        dayLdg: '',
        depAir: '',
        dualI: '',
        enrRout: '',
        flightNum: '',
        holds: '',
        hood: '',
        iap: '',
        imc: '',
        instructor: '',
        landings: '',
        nightLdg: '',
        pic: '',
        sic: '',
        solo: '',
        student: '',
        total: '',
        cxt: '',
    })
    const [modal, setModal] = useState({
        open: false,
        values: []
    });
    const [user, setUser] = useState({
        userId: ''
    })

    useEffect(() => {
        getFlights();
        API.userData()
            .then(res => {
                setUser(({
                    userId: res.data.id
                }))
            })
            .catch(err => {
                console.error(err)
            })
            API.getAircraftTypes()
            .then(({ data }) => {
                let rawResults = []
                let filteredResults = []
                let uniqueId = []
                for (let i = 0; i < data.length; i++) {
                    if (!uniqueId.includes(data[i].AircraftId)) {
                        if (data[i]['Aircraft.tailNumber'] != null) {
                            rawResults.push(data[i])
                            uniqueId.push(data[i].AircraftId)
                        }
                    }
                }
                // console.log()
                filteredResults = rawResults.map((a) => ({
                    value: a.AircraftId, 
                    label: a['Aircraft.tailNumber']+' '+a['Aircraft.AircraftModel.description'],
                    
                }))
                let filteredResultsSorted = filteredResults.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label)? -1 : 0))
                
                setlogbookForm(logbookForm => ({
                    ...logbookForm,
                    aircraftList: filteredResultsSorted
                }))
            })
    }, [])

    const getFlights = () => {
        API.getFlights()
            .then((res) => {
                const mapped = res.data.map(x => ({
                    Date: x.date,
                    Aircraft: x['Aircraft.tailNumber'],
                    Route: x.route,
                    Comments: x.comments,
                    Total: x.total,
                    id: x.id
                }))
                setState(state => ({
                    ...state,
                    fullResults: res.data,
                    mapped
                }))
            })
            .catch(err => {
                console.log(err)
                window.location.href = '/'
            });
    }
    const setAircraft = (value) => {
        setlogbookForm(logbookForm => ({
            ...logbookForm,
            AircraftId:value.value
        }))
        
    }
    const handleFormInput = ({ target: { value, name } }) => {
        setlogbookForm(logbookForm => ({
            ...logbookForm,
            // date: new Date(),
            [name]: value
        }))
    };

    const workingTimeDistance = async (e) => {
        e.preventDefault();
        if (logbookForm.route === undefined ||
            logbookForm.depTime === undefined ||
            logbookForm.arrTime === undefined ){
                return alert('Need to fill in Route, Departure Time and Arrival Time')
            }
        await workingTimes();
        await findDistance();
        await calcTime();
    }

    const workingTimes = async () => {
        const eachAirport = logbookForm.route.split(' ')
        for (let i = 0; i < eachAirport.length; i++) {
            await getLatLong(eachAirport[i])
        }
    }
    async function getLatLong(icao) {
        await API.getAirports(icao)
            .then(async ({ data }) => {
                const objectArray = Object.values(data[0])
                airportLoc.push(parseFloat(objectArray[8], 10), parseFloat(objectArray[9], 10))
            })
            .catch(console.error)
    }

    const findDistance = async () => {
        let y = -1;

        for (let i = 0; i < airportLoc.length / 2; i += 2) {
            y++
            distance(airportLoc[i], airportLoc[i + 1], airportLoc[i + 2], airportLoc[i + 3])
            if (distNum[y] > 50) {
                crossCountryTrue = true

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
        var a = Math.pow(Math.cos(lat2) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta), 2);
        var b = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
        var angle = Math.atan2(Math.sqrt(a), b);

        distNum.push(angle * r)

    }

    // Calculates total time from the clock times that are input in the time boxes. If no date is entered than todays date is assumed. 
    const calcTime = async () => {
        var departTimeDateAdd = false
        var arrTimeDateAdd = false
        let departTimeDate = '';
        let arrTimeDate = '';
        let timeCalc = 0;
        const tdDate = moment.utc((logbookForm.date))
        const userDate = tdDate._i

        const departTime = logbookForm.depTime
        const arrTime = logbookForm.arrTime
        // Here we are checking if the user just input a time. If that is true then we take the date from the date box and put it in from of the time. We are using the newDate to format it as a date correctly to work with. 

        if (new Date(departTime) == 'Invalid Date') {
            departTimeDate = moment.utc((userDate + ' ' + departTime))
            departTimeDateAdd = true
        } else {
            departTimeDate = moment.utc(departTime)
        }

        if (new Date(arrTime) == 'Invalid Date') {
            arrTimeDate = moment.utc(userDate + ' ' + arrTime + ":00Z")
            arrTimeDateAdd = true
        } else {
            arrTimeDate = moment.utc(arrTime)
        }

        // Subtracting the times in milliseconds. 
        let momentMillie = moment.duration(arrTimeDate.diff(departTimeDate))
        timeCalc = convertToHoursMM(momentMillie._milliseconds)


        // Auto filling times. Will add more as we have user preferences. 

        /*
        // Filling the departure box back in so the user can see what date was used from their calculations
        if (departTimeDateAdd){
            (document.getElementById('deptTime').value) = (departTimeDate.getUTCMonth()+1)+'/'+departTimeDate.getUTCDate()+'/'+departTimeDate.getUTCFullYear()+' '+departTime
        }
        // filling the arrival time back in
        if (arrTimeDateAdd){
            (document.getElementById('arrTime').value) = (arrTimeDate.getUTCMonth()+1)+'/'+arrTimeDate.getUTCDate()+'/'+arrTimeDate.getUTCFullYear()+' '+arrTime
        }
        */
        nighttimeGather(departTimeDate, arrTimeDate, timeCalc)

    }

    let sunTimesArr = []
    async function nighttimeGather(depart, arrive, timeCalc) {
        let nightTime

        // Getting the departure airport suntimes dawn, sunrise, sunset, dusk pushing them into an array.
        // always going to take the first airport and the last airport. Getting the last airport by finding the length of the array and taking the last two items. 
        // all calculations are done on sunrise and sunset times. Carrying dawn times but not using them for anything right now. 
        const numofAirport = airportLoc.length
        console.log()
        await sunTimes(depart, airportLoc[0], airportLoc[1])
        await sunTimes(arrive, airportLoc[numofAirport - 2], airportLoc[numofAirport - 1])

        let depRise = sunTimesArr[1]
        let depSet = sunTimesArr[2]
        let arrRise = sunTimesArr[5]
        let arrSet = sunTimesArr[6]
        console.log("dep ", depRise, " depart ", depart)

        if ((depart.isBefore(depRise) && arrive.isBefore(arrRise)) || (depart.isAfter(depSet) && arrive.isAfter(arrSet))) {
            // this is for an all night flight before sunrise or after sunset
            nightTime = timeCalc
        } else if (depart.isBefore(depRise) && arrive.isAfter(arrRise)) {
            // this is for an early morning departure before the sunrises

            nightTime = convertToHoursMM(moment.duration(depRise.diff(depart)))
        } else if (depart.isBefore(depSet) && arrive.isAfter(arrSet)) {
            // evening flight departure before sunset and landing after sunset
            // moment.duration(arrTimeDate.diff(departTimeDate))
            nightTime = convertToHoursMM(arrive - arrSet)
        } else {
            nightTime = 0
        }
        if (nightTime > timeCalc) {
            nightTime = timeCalc
        }
        console.log(nightTime)
        setlogbookForm(logbookForm => ({
            ...logbookForm,
            total: timeCalc,
            cxt: crossCountryTrue ? timeCalc : 0,
            night: nightTime
        }))

    }
    async function sunTimes(date, lat, long) {
        await API.sunriseSunset(date, lat, long)
            .then(({ data }) => {
                let dawnCalc = moment.utc(data.dawn)
                let sunriseCalc = moment.utc(data.sunrise)
                let sunsetCalc = moment.utc(data.sunset)
                let duskCalc = moment.utc(data.dusk)

                sunTimesArr.push(dawnCalc, sunriseCalc, sunsetCalc, duskCalc)
            })

    }

    function convertToHoursMM(diff) {
        // Converting the time back to hours and minutes in a decimal form. 
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = (msec / 1000 / 60 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        // Limiting it to 2 decimal places. 
        return (hh + mm).toFixed(2)
    }

    const logFlight = (e) => {
        const nullChecked = {}
        Object.keys(logbookForm)
            .forEach(key => {
                nullChecked[key] = !!logbookForm[key] ? logbookForm[key] : null
            })

        console.log(logbookForm)

        e.preventDefault()
        API.createFlight({
            date: nullChecked.date,
            route: nullChecked.route,
            comments: nullChecked.comments,
            flightNum: nullChecked.flightNumber,
            depTime: nullChecked.departureTime,
            arrTime: nullChecked.arrivalTime,
            landings: nullChecked.landings,
            approach: nullChecked.approach,
            hold: nullChecked.hold,
            dayLandings: nullChecked.dayLandings,
            nightLandings: nullChecked.nightLandings,
            total: nullChecked.total,
            crossCountry: nullChecked.crossCountry,
            night: nullChecked.night,
            imc: nullChecked.imc,
            hood: nullChecked.hood,
            pic: nullChecked.pic,
            sic: nullChecked.sic,
            cfi: nullChecked.cfi,
            dual: nullChecked.dual,
            solo: nullChecked.solo,
            UserId: state.userId,
            AircraftId: nullChecked.AircraftId
        })
            .then((data) => {
                console.log("logFlight data: ", data)
                getFlights();
            })
            .catch(console.error)

    }

    const getTotals = () => {

        API.getFlightTotals()
            .then(({ data }) => {
                setState(state => ({
                    ...state,
                    totals: data[0],
                }))
            })
            .catch(err => console.error(err))

    }

    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
                return (
                    <>
                        <AddFlightForm
                            handleFormInput={handleFormInput}
                            handleClick={workingTimeDistance}
                            handleAddFlight={logFlight}
                            value={logbookForm}
                            setAircraft={setAircraft}
                        />
                    </>
                )
            case 'totalsBtn':
                // console.log('totals', state.totals)
                // getTotals()
                return (
                    <TotalsDisplay
                        totals={state.totals}
                    />
                )
            default:
                return null;
        };
    };

    const openModal = e => {
        e.preventDefault();
        const { target } = e;

        setModal(prevModal => ({
            ...prevModal,
            open: !modal.open,
            values: state.fullResults.find(x => parseInt(x.id) === parseInt(target.id))
        }))
        console.log(modal)
        console.log(state)
    };

    const openEdit = id => {
        console.log('open edit id', id)

        const selected = state.fullResults
            .find(x => parseInt(x.id) === id)
        const newLog = {}

        if (!selected) return;
        Object.keys(logbookForm).forEach(key => { newLog[key] = selected[key] })
        setlogbookForm(newLog)
        setModal(prevModal => ({
            ...prevModal,
            open: !modal.open
        }))
        setState({
            ...state,
            open: true,
            btnClicked: 'addFlightBtn'
        })
    }

    const deleteBtn = id => {
        // hit the delete flight route
        API.deleteFlight(id)
            .then(getFlights())
            .catch(err => console.log(err))
        // closes modal after flight is deleted
        setModal(prevModal => ({
            ...prevModal,
            open: !modal.open
        }))
    }

    return (
        <UserContext.Provider value={user}>
            <div>
                {
                    (modal.open && !!modal.values) &&

                    <Modal
                        key={modal.values.id}
                        results={modal.values}
                        openEdit={openEdit}
                        deleteBtn={deleteBtn}
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
                            setState(state => ({
                                ...state,
                                open: !state.open,
                                btnClicked: target.id
                            }))
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
                            getTotals();
                            console.log(state.btnClicked)
                        }}
                    />
                    {/* <Button
                    text='Training'
                    btnId='training'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e;
                        e.preventDefault()
                        console.log("add flight")
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
                    }}
                /> */}
                    <Button
                        text='Logout'
                        btnId='logout'
                        btnClass='menuBtn'
                        handleClick={(e) => {
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
                        openModal={openModal} flights={state.mapped}
                    />
                    {/* Modal for popping out table. maybe a 'view' button opens and closes it */}
                    {/* The table will live here. Might try to do an actual table first, then will try grid or flexbox. */}
                </main>

            </div>
        </UserContext.Provider>
    )
}

export default Logbook;