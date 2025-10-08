import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import currencyConversion from "../data/currencies.json";

function Chart({ jobs }) {
    const chartInfo = {
        "Entry-Level, Junior": {
            "countMin": 0,
            "countMax": 0,
            "minTotal": 0,
            "maxTotal": 0
        },
        "Midweight": {
            "countMin": 0,
            "countMax": 0,
            "minTotal": 0,
            "maxTotal": 0
        },
        "Senior": {
            "countMin": 0,
            "countMax": 0,
            "minTotal": 0,
            "maxTotal": 0
        },
        "Director": {
            "countMin": 0,
            "countMax": 0,
            "minTotal": 0,
            "maxTotal": 0
        },
        "Any": {
            "countMin": 0,
            "countMax": 0,
            "minTotal": 0,
            "maxTotal": 0
        }
    };

    jobs.forEach(job => {
        if (job.salaryMin) {
            chartInfo[job.jobLevel]["countMin"] += 1;
            chartInfo[job.jobLevel]["minTotal"] += job.salaryMin * currencyConversion[job.salaryCurrency];
        }
        if (job.salaryMax) {
            chartInfo[job.jobLevel]["countMax"] += 1;
            chartInfo[job.jobLevel]["maxTotal"] += job.salaryMax * currencyConversion[job.salaryCurrency];
        }
    });

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Average Salaries by Job Level',
            },
        },
    };

    const labels = ["Entry-Level, Junior", "Midweight", "Senior", "Director", "Any"];

    const data = {
        labels,
        datasets: [
            {
            label: 'Min Salary',
            data: labels.map(label => chartInfo[label]["minTotal"]/chartInfo[label]["countMin"]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: 'Max Salary',
            data: labels.map(label => chartInfo[label]["maxTotal"]/chartInfo[label]["countMax"]),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

	return (
		<Bar options={options} data={data} />
	)
}

export default Chart;