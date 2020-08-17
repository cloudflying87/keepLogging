import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../logoSmall.png';

const Nav = () => {

    const [state, setState] = useState({
        open: false,
        width: window.innerWidth
    });

    const toggleNav = () => {

        setState({
            open: !state.open
        })
        console.log(state.open)
    }


    return (
        <nav>
            <img src={logo} alt='keep_logging logo' />
            <span className='burger'>
                <i
                    className="fas fa-bars"
                    onClick={toggleNav}
                ></i>
            </span>
            <ul className="navList"
                style={!state.open && state.width < 468 ? ({display: 'flex'}) : ({display: 'none'})}>
                <li>
                    <Link
                        to='/logbook'
                    >
                        Logbook
                     </Link>
                </li>
                <li>
                    <Link
                        to='/aircraft'
                    >
                        Aircraft
                     </Link>
                </li>
                <li>
                    <Link
                        to='/airports'
                    >
                        Airports
                     </Link>
                </li>
                <li>
                    <Link
                        to='/training'
                    >
                        Training
                     </Link>
                </li>
                <li>
                    <Link
                        to='/myProfile'>
                        My Profile
                     </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
