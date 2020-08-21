import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import API from '../utils/API'

const Aircraft = () => {
const[state, setState] = useState({
    results:[]
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
                    ...state,results: 
                    filteredResults.sort()}))
            })
    })
    return (
        <>
            <Nav />
            <div>
                <h1>My Aircraft</h1>
            </div>
            <div className='tableBody'>
                {
                    !!state.results.length &&
                    state.results.map((x, i) => <div key={i + '-row'} id={x.id} className='tableCol'>
                        <div className='aircraft' id={x}>{x}</div>
                        
                    </div>)
                }
            </div>
        </>
    );


};


export default Aircraft;