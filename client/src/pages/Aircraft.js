import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import API from '../utils/API';
import AircraftDisplay from '../components/AircraftDisplay/'
import Button from '../components/Button/index'
import AddAircraft from '../components/AddAircraftForm'
// import UserContext from '../utils/UserContext';
import getAircraftTypesFunction from '../components/AircraftDisplay/function'



const Aircraft = () => {
    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        userCurrentAircraft: [],
        tailNumber: '',
        modelId: 0
    });

    useEffect(() => {
        getCurrentTypes()
        getAllTypes()
    }, [])

    const getAllTypes = () => {
        API.getAircraftModels()
            .then(({ data }) => {
                const formattedResults = data.map(x => ({
                    value: x.id,
                    label: x.manufacture_code + ' ' + x.description + ' ' + x.category_class
                }))

                setState(state => ({
                    ...state,
                    allModels: formattedResults
                }))
            })

    }

    const getCurrentTypes = () => {
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


                filteredResults = rawResults.map((a) => ({
                    id: a.AircraftId,
                    modelId: a['Aircraft.AircraftModel.id'],
                    tailNumber: a['Aircraft.tailNumber'],
                    description: a['Aircraft.AircraftModel.description'],
                    category_class: a['Aircraft.AircraftModel.category_class'],
                    // tailWheel:a['Aircraft.AircraftModel.tailWheel'],
                    // highPerf:a['Aircraft.AircraftModel.highPerf'],
                    // complex:a['Aircraft.AircraftModel.complex'],
                    // taa:a['Aircraft.AircraftModel.taa'],
                    // simulator:a['Aircraft.AircraftModel.simulator'],
                    // designator: a['Aircraft.AircraftModel.tdesig'],

                }))
                let filteredResultsSorted = filteredResults.sort((a, b) => (a.tailNumber > b.tailNumber) ? 1 : ((b.tailNumber > a.tailNumber) ? -1 : 0))

                setState(state => ({
                    ...state,
                    userCurrentAircraft: filteredResultsSorted
                }))
            })
            .catch(console.error)
    }
    const handleFormInput = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))

    };

    const addTail = (event) => {
        event.preventDefault()
        API.createAircraft({
            tailNumber: state.tailNumber,
            AircraftModelId: state.modelId
        })
            .then((data) => {
                
            })

            .catch(console.error)
    }

    const setAircraft = (value) => {
        setState(state => ({
            ...state,
            modelId: value.value
        }))

    }

    const switchFunc = arg => {
        switch (arg) {
            case 'Addaircraft':
                return (
                    <>
                        <AddAircraft
                            handleFormInput={handleFormInput}
                            addT={addTail}
                            value={state}
                            setAircraft={setAircraft}
                        />
                    </>
                )
            default:
                break;
        };
    };

    const openAccordion = e => {
        const { target } = e
        setState(state => ({
            ...state,
            open: !state.open,
            btnClicked: target.id
        }))
    }
    return (
        <>
            <Nav />
            <div className='menuDiv'>
                <Button
                    text='Add Aircraft'
                    btnId='Addaircraft'
                    btnClass='menuBtn'
                    handleClick={openAccordion}
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
            <AircraftDisplay aircraft={state.userCurrentAircraft} />
        </>
    );


};


export default Aircraft;