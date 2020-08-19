import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Nav from '../components/Nav/index';
import AddFlightForm from '../components/AddFlightForm/index';
import Table from '../components/Table/index';

import './logbook.css'

const Logbook = () => {

    const [state, setState] = useState({
        open: false,
        btnClicked: '',
    })

    // useEffect(() => {

    // }, [state.btnClicked])

    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
        console.log(state)
    };

    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
                return <AddFlightForm />
                break;
            default:
                return null;
                break;
        }
    }

    return (
        <div>
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
                        setState({
                            open: !state.open,
                            btnClicked: target.id
                        })
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
                <Table />
                {/* Modal for popping out table. maybe a 'view' button opens and closes it */}
                {/* The table will live here. Might try to do an actual table first, then will try grid or flexbox. */}

            </main>

        </div>
    )
}

export default Logbook;