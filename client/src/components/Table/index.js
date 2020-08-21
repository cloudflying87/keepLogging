import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import './style.css'

const Table = ({ openModal }) => {

    const [state, setState] = useState();
    const [mobileTable, setMobileTable] = useState({
        results: []
    });

    useEffect(() => {
        API.getFlights()
            .then(async ({ data }) => {
                setState(data)
                const mapped = await data.map(x => ({
                    Date: x.date,
                    Aircraft: x['Aircraft.tailNumber'],
                    Route: x.route,
                    Comments: x.comments,
                    Total: x.total,
                    id: x.id
                }))
                setMobileTable(state=> ({
                    ...state,
                    results: mapped
                }))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className='table'>
                <div className='tableHeader'>
                    {
                        !!mobileTable.results.length &&
                        Object.keys(mobileTable.results[0]).filter(x=> x !== 'id').map((x, i) => <h5 key={i} className={'col'+ i} name={x}>{x}</h5>)
                    }
                </div>
                <div className='tableBody'>
                    {
                        !!mobileTable.results.length &&
                        mobileTable.results.map((x, i) => <div key={i + '-row'} id={x.id} className='tableCol' onClick={openModal}>
                            <div className='dateCol' id={x.id}>{x.Date}</div>
                            <div className='aircraftCol' id={x.id}>{x.Aircraft}</div>
                            <div className='routeCol' id={x.id}>{x.Route}</div>
                            <div className='commentsCol' id={x.id}>{x.Comments}</div>
                            <div className='totalCol' id={x.id}>{x.Total}</div>
                        </div>)
                    }
                </div>

            </div>



{/* 
            <table>
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table> */}
        </div>
    )
}

export default Table;