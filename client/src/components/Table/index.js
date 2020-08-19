import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import './style.css'

const Table = () => {

    const [state, setState] = useState();
    const [mobileTable, setMobileTable] = useState({
        results: []
    });
    const [modal, setModal] = useState();

    useEffect(() => {
        API.getFlights(1)
            .then(async ({ data }) => {
                setState(data)
                const mapped = await data.map(x => ({
                    Date: x.date,
                    Aircraft: x['Aircraft.tailNumber'],
                    Route: x.route,
                    Comments: x.comments,
                    Total: x.total
                }))
                setMobileTable(state => ({
                    ...state,
                    results: mapped
                }))
            })
            .catch(err => console.log(err))

    }, [])

    const mobileTableRender = () => {
    }

    return (
        <div>
            <div className='table'>
                <div className='tableHeader'>
                    {
                        !!mobileTable.results.length &&
                        Object.keys(mobileTable.results[0]).map((x, i) => <h5 key={i} className={'col'+ i} name={x}>{x}</h5>)
                    }
                </div>
                <div className='tableBody'>
                    {
                        !!mobileTable.results.length &&
                        mobileTable.results.map((x, i) => <div key={i + '-row'} className='tableCol'>
                            <div className='dateCol'>{x.Date}</div>
                            <div className='aircraftCol'>{x.Aircraft}</div>
                            <div className='routeCol'>{x.Route}</div>
                            <div className='commentsCol'>{x.Comments}</div>
                            <div className='totalCol'>{x.Total}</div>
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