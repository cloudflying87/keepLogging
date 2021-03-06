import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './style.css'

const Table = ({ openModal, flights }) => {

    const [showTable, setShowTable] = useState()

    useEffect(() => {
        setShowTable(true)
    }, [])
    return (
        <>
            <CSSTransition
                in={showTable}
                timeout={2000}
                className='enter'
                unmountOnExit
            >
                <div className='table'>
                    <div className='tableHeader'>
                        {
                            !!flights.length &&
                            Object.keys(flights[0]).filter(x => x !== 'id').map((x, i) => <h5 key={i} className={'col' + i} name={x}>{x}</h5>)
                        }
                    </div>
                    <div className='tableBody'>
                        {
                            !!flights.length &&
                            flights.map((x, i) => <div key={i + '-row'} id={x.id} className='tableCol' onClick={openModal}>
                                <div className='dateCol' id={x.id}>{x.Date}</div>
                                <div className='aircraftCol' id={x.id}>{x.Aircraft}</div>
                                <div className='routeCol' id={x.id}>{x.Route}</div>
                                <div className='commentsCol' id={x.id}>{x.Comments}</div>
                                <div className='totalCol' id={x.id}>{x.Total}</div>
                            </div>)
                        }
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}

export default Table;