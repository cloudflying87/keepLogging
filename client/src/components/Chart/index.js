import React from 'react'
import { Bar } from 'react-chartjs-2';

const Chart = ({ totals }) => {

    const filteredTotals = {
        'xCountry': totals.cxt,
        pic: totals.pic,
        sic: totals.sic,
        cfi: totals.cfi,
        dualI: totals.dualI,
        solo: totals.solo,
        total: totals.total,
        night: totals.night
    }

    const data = {
        labels: Object.keys(filteredTotals),
        datasets: [
            {
                label: 'Hours',
                backgroundColor: 'rgba(255,255,255,.8)',
                borderColor: 'rgba(0,26,200,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(filteredTotals)
            }
        ]
    };

    return (
        <div>
            <h2>Totals</h2>
            <Bar
                data={data}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    );
};

export default Chart;