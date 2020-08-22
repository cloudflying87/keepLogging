import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import API from '../utils/API';
import AircraftDisplay from '../components/AircraftDisplay/'
import Modal from '../components/Modal/index';
import AddAircraft from '../components/AddAircraftForm'
import Button from '../components/Button/index'


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
    const handleFormInput = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            // date: new Date(),
            [name]: value
        }))
    };
    const switchFunc = arg => {
        switch (arg) {
            case 'Addaircraft':
                return (
                    <>
                        <AddAircraft
                            handleFormInput={handleFormInput}
                            
                        />
                    </>
                )
                break;
            case 'totalsBtn':
                // console.log('totals', state.totals)
                // getTotals()
                // return (
                    // <TotalsDisplay
                    //     totals={state.totals}
                    // />
                // )
                break;
            default:
                return null;
                break;
        };
    };

    // const openModal = e => {
    //     e.preventDefault();
    //     const { target } = e;

    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open,
    //         values: state.fullResults.find(x => parseInt(x.id) === parseInt(target.id))
    //     }))
    //     console.log(modal)
    //     console.log(state)
    // };

    // const openEdit = id => {
    //     console.log('open edit id', id)

    //     const selected = state.fullResults
    //         .find(x => parseInt(x.id) === id)
    //     const newLog = {}

    //     if (!selected) return;
    //     Object.keys(logbookForm).forEach(key => { newLog[key] = selected[key] })
    //     setlogbookForm(newLog)
    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open
    //     }))
    //     setState({
    //         ...state,
    //         open: true,
    //         btnClicked: 'addFlightBtn'
    //     })
    // }

    // const deleteBtn = id => {
    //     // hit the delete flight route
    //     API.deleteFlight(id)
    //         .then(getFlights())
    //         .catch(err => console.log(err))
    //     // closes modal after flight is deleted
    //     setModal(prevModal => ({
    //         ...prevModal,
    //         open: !modal.open
    //     }))
    // }
    return (
        <>
            <Nav />
            <div className='menuDiv'>
                {/* here will be the buttons for this page. Maybe i'll make a component for these since there will be one on each page. */}
                <Button
                    text='Add Aircraft'
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
            <AircraftDisplay aircraft={state.results} />

        </>
    );


};


export default Aircraft;