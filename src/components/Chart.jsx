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
import { callback } from 'chart.js/helpers';

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
				position: 'bottom',
			},
			title: {
				display: true,
				text: 'Average Salaries by Job Level (USD)',
			},
		},
		scales: {
			y: {
				ticks: {
					callback: value => `$${value.toLocaleString()}`
				}
			}
		}
	};

	const labels = ["Entry-Level, Junior", "Midweight", "Senior", "Director", "Any"];

	const data = {
		labels,
		datasets: [
			{
				label: 'Min Salary',
				data: labels.map(label => chartInfo[label]["minTotal"] / chartInfo[label]["countMin"]),
				backgroundColor: ' #E8DDC1',
			},
			{
				label: 'Max Salary',
				data: labels.map(label => chartInfo[label]["maxTotal"] / chartInfo[label]["countMax"]),
				backgroundColor: ' #B3A593',
			},
		],
	};

	return (
		<Bar options={options} data={data} />
	)
}

export default Chart;