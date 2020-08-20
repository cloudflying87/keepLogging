import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Nav from '../components/Nav/index';
import AddFlightForm from '../components/AddFlightForm/index';
import Table from '../components/Table/index';
import Modal from '../components/Modal/index';
import API from '../utils/API';
import User from '../utils/User';

import './logbook.css'


const Logbook = () => {
    
    const [state, setState] = useState({
        open: false,
        btnClicked: '',
        fullResults: []
    })
    const [logbookForm, setlogbookForm] = useState({})
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
                    window.location.href ='/'
            })
    }, [])

    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
    };
    
    const handleFormInput = ({ target: { value, name } }) => {
        setlogbookForm(state => ({
            ...state,
            [name]: value
        }))
        
    };

    const dateSet = () => {
        const dateWorking = new Date()
        let dateCur = (dateWorking.getMonth()+1) +'/'+dateWorking.getDate()+'/'+dateWorking.getFullYear()
        console.log("Test ", dateCur)
        // console.log(document.getElementById('dateInput').value)
        document.getElementById('dateInput').value = dateCur
        // return dateCur
    }

    const displayState = (e) => {
        e.preventDefault()
        console.log(logbookForm)
        API.createFlight({logbookForm})
    }
    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
                return (
                <>
                <AddFlightForm 
                    handleFormInput={handleFormInput}
                    handleAddFlight={displayState}
                />
                </>
                )
                break;
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
                        console.log("add flight")
                        setState(state=> ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
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
                            .then(window.location.href="/")
                            .catch(err=> console.error(err))
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