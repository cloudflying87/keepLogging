import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const Table = () => {

    const [state, setState] = useState();
    const [mobileTable, setMobileTable] = useState({
        results: []
    });

    useEffect(() => {
        API.getFlights(1)
            .then(async ({ data }) => {
                setState(data)
                const mapped = await data.map(x => ({
                    Date: x.date,
                    Aircraft: x['Aircraft.aircraftType'],
                    Route: `${x.depAir} ${x.arrAir}`,
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
            <table>
                <thead>
                        <tr>
                            {
                                !!mobileTable.results.length &&
                                Object.keys(mobileTable.results[0]).map((x, i) => <th key={i} name={x}>{x}</th>)
                            }
                        </tr>
                </thead>
            </table>
        </div>
    )
}

export default Table;