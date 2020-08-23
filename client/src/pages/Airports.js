import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav/index';
import ViewAirport from '../components/ViewAirport'
import API from '../utils/API';
import Button from '../components/Button/index'
import UserContext from '../utils/UserContext';


const Airports = () => {
    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        userCurrentAircraft: [],
        airport: '',
        modelId:0
    });
    const [user, setUser] = useState({
        userId: ''
    })

    const handleFormInput = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            // date: new Date(),
            [name]: value
        }))
        console.log(state)
    };
    const switchFunc = arg => {
        switch (arg) {
            case 'viewAiport':
                return (
                    <>
                        <ViewAirport
                            handleFormInput={handleFormInput}
                            value={state}
                            
                        />
                    </>
                )
                break;
            default:
                return null;
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
        <UserContext.Provider value={user}>
            <Nav />
            <div className='menuDiv'>
                {/* here will be the buttons for this page. Maybe i'll make a component for these since there will be one on each page. */}
                <Button
                    text='View Airport'
                    btnId='viewAiport'
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
            

        </UserContext.Provider>
    );

    
};


export default Airports;