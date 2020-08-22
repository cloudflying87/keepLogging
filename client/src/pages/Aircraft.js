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
                let rawResults = []
                let filteredResults = []
                let uniqueId = []
                for (let i = 0; i < data.length; i++) {
                    if (!uniqueId.includes(data[i].AircraftId)) {
                        if (data[i]['Aircraft.tailNumber'] != null) {
                            // filteredResults.push(data[i]['Aircraft.tailNumber'] + ' ' + data[i]['Aircraft.AircraftModel.description'])
                            rawResults.push(data[i])
                            uniqueId.push(data[i].AircraftId)
                        }
                    }

                }
                // console.log()
                filteredResults = rawResults.map((a) => ({
                    id: a.AircraftId, 
                    tailNumber: a['Aircraft.tailNumber'],
                    description: a['Aircraft.AircraftModel.description'],
                    designator: a['Aircraft.AircraftModel.tdesig']
                }))
                let filteredResultsSorted = filteredResults.sort((a,b) => (a.tailNumber > b.tailNumber) ? 1 : ((b.tailNumber > a.tailNumber)? -1 : 0))
                
                setState(state => ({
                    ...state,
                    results: filteredResultsSorted
                }))
            })
        // for (let i = 0; i < aircraftDropDownValues.length; i++) {
        //     let options = $('<option>').text(aircraftDropDownValues[i]).attr('value', aircraftDropDownValues[i])
        //     $('#aircraftID').append(options);
        // }
        // aircraftDropDown = new SlimSelect({
        //     select: '#aircraftID'
        // });
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