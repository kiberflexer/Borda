// import { Chart } from 'chart.js';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import * as helpers from "chart.js/helpers";
import { Chart } from 'react-chartjs-2';

// Chart.register(TreemapController, TreemapElement);

const DATA_COUNT = 12;
const NUMBER_CFG = {count: DATA_COUNT, min: 2, max: 40};
function colorFromRaw(ctx, border) {
    if (ctx.type !== 'data') {
        return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color = 'purple';
    if (border) {
        alpha += 0.5;
    }
    return helpers.color(color)
        .alpha(alpha)
        .rgbString();
}



const config = {
    type: 'treemap',
    data: {
        datasets: [
            {
                label: 'My treemap dataset',
                tree: [15, 6, 6, 5, 4, 3, 2, 2],
                borderColor: 'green',
                borderWidth: 1,
                spacing: 0,
                backgroundColor: (ctx) => colorFromRaw(ctx),
            }
        ],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'My treemap chart'
            },
            legend: {
                display: false
            }
        }
    }
};

export function TreemapChartJS({props}){
    return(
        <Chart
            type={config.type}
            options={config.options}
            data={config.data}
            {...props}
        />
        // <TreemapController config={config}>
        //
        // </TreemapController>
    )
}