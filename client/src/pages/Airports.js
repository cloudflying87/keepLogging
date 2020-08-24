import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import ViewAirport from '../components/ViewAirport'
import API from '../utils/API';
import Button from '../components/Button/index'
import UserContext from '../utils/UserContext';
import MapSection from '../components/map/Map' 
import '../components/ViewAirport/style.css'

const Airports = () => {
    const [state, setState] = useState({
        open: 0,
        btnClicked: '',
        userCurrentAircraft: [],
        airport: '',
        modelId: 0,
        google:'',
        
    });
    const [user, setUser] = useState({
        userId: ''
    })

    const handleFormInput = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            // date: new Date(),
            airport: value
        }))
        // apiCall()  

    };
    const apiCall = () => {
        API.getAirports({
            airport: state.airport
        })
            .then(({ data }) => {
                const formattedResults = data.map(a => ({
                    icao: a.icao,
                    name: a.name,
                    iata: a.iata,
                    city: a.city,
                    state: a.state,
                    country: a.country,
                    lat: a.lat,
                    long: a.lon,
                    elevation: a.elevation

                }))
                setState(state => ({
                    ...state,
                    airportInfo: formattedResults,
                    open: true
                }))
            })
            .catch(console.error)
    }
    
    const printState = (data) => {
        if (data.length === 0) {
            return (
                <div className="airport">
                    <h1>No Airport Found. Try again. </h1>
                </div>
            )
        } else {
            const location =[]
            location.push(parseFloat(data[0].lat,10),
            parseFloat(data[0].long,10))              
              
            return (
                <>
                <div className="airport">
                    <h1>{data[0].name}</h1>
                    <h2>{data[0].city + ' ' + data[0].state + ' ' + data[0].country}</h2>
                    <h2>Elevation: {data[0].elevation}</h2>
                </div>
                <div>
                <MapSection 
                    location={location} 
                    zoomLevel={13} 
                    
                    />
                    
                </div>
                </>
            )
        }
    }
    const printNoAirport = () => {
        return (
            <div className="airport">
                <h1>Search for an airport by ICAO code</h1>
            </div>
        )

    }

    return (
        <UserContext.Provider value={user}>
            <Nav />
            <div className='menuDiv'>
                <ViewAirport
                    handleFormInput={handleFormInput}
                    handleClick={apiCall}
                    value={state}

                />
            </div>
            <div className='formDiv'>
                {!state.open ? printNoAirport() : (printState(state.airportInfo))}
            </div>


        </UserContext.Provider>
    );


};


export default Airports;