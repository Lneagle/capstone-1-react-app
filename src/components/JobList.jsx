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

const currencyConversion = {
    "USD": 1,
    "PHP": 0.017,
    "GBP": 1.34,
    "EUR": 1.16,
    "CAD": 0.72
};

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function JobList({ jobs }) {
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

    console.log(chartInfo);

    const jobList = jobs.map(job =>
        <tr key={job.id}>
            <td><a href={job.url} target="_blank">{job.jobTitle.replace("&amp;#8211;", "–").replace("&amp;#038;", "&")}</a></td>
            <td>{job.companyName.replace("&amp;#038;", "&")}</td>
            <td>{job.jobIndustry.join(", ").replace("&amp;", "&")}</td>
            <td>{job.jobType.join(", ")}</td>
            <td>{job.jobGeo}</td>
            <td>{job.jobLevel}</td>
            <td>{job.salaryMin} - {job.salaryMax}{job.salaryCurrency}</td>
        </tr>
    );

	return (
		<>
            <Bar options={options} data={data} />
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Industry</th>
                        <th>Job Type</th>
                        <th>Location</th>
                        <th>Job Level</th>
                        <th>Salary Range</th>
                    </tr>
                </thead>
                <tbody>
                    {jobList}
                </tbody>
            </table>
		</>
	)
}

export default JobList;