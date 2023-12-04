import {
    Chart as ChartJS,
} from 'chart.js/auto';
import {
    TreemapController,
    TreemapElement,
} from 'chartjs-chart-treemap';
import {Chart} from "react-chartjs-2";

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
                backgroundColor: '000',
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
