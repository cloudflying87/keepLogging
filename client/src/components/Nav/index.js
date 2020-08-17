import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../logoSmall.png';

const Nav = () => {

    const [state, setState] = useState({
        open: false,
        width: window.innerWidth
    });

    useEffect(() => {
        function setWidth() {
            setState(state => ({
                ...state,
                width: window.innerWidth
            }))
        }

        window.addEventListener('resize', setWidth);

        return _ => {
            window.removeEventListener('resize', setWidth);
        }
    }, [state.width, state.open])

    const toggleNav = () => {
        setState(state => ({
            ...state,
            open: !state.open
        }))
        console.log("state.open: ", state.open)
        console.log('width: ', state.width)
        const burger = document.querySelector('i');
        const navList = document.querySelector('ul');
        navList.classList.toggle('navActive')
        burger.classList.toggle('fa-times');
        burger.classList.toggle('fa-bars');
    }


    return (
        <nav>
            <div className='logoDiv'>
                <img src={logo} alt='keep_logging logo' />
                <div className='burger'>
                    <i
                        className="fas fa-bars"
                        onClick={toggleNav}
                    />
                </div>
            </div>
                <ul className="navList">
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
