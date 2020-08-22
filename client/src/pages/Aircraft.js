import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import API from '../utils/API';
import AircraftDisplay from '../components/AircraftDisplay/'


const Aircraft = () => {
    const [state, setState] = useState({
        results: []
    });

    useEffect(() => {
        API.getAircraftTypes()
            .then(({ data }) => {
                let filteredResults = []
                let uniqueId = []
                for (let i = 0; i < data.length; i++) {
                    if (!uniqueId.includes(data[i].AircraftId)) {
                        filteredResults.push(data[i]['Aircraft.tailNumber'] + ' ' + data[i]['Aircraft.AircraftModel.description'])
                        uniqueId.push(data[i].AircraftId)
                    }

                }
                setState(state => ({
                    ...state,
                    results: filteredResults.sort()
                }))
            })

    })
    return (
        <>
            <Nav />
            <div>
                <h1>My Aircraft</h1>
            </div>
            <AircraftDisplay aircraft={state.results} />

        </>
    );


};


export default Aircraft;