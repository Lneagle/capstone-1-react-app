import { useState } from 'react';
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

function JobList({ jobs }) {
    const [sortConfig, setSortConfig] = useState(null);

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

    const sortedJobs = [...jobs];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    if (sortConfig) {
        sortedJobs.sort((a, b) => {
            if (sortConfig.key == "jobIndustry" || sortConfig.key == "jobType") {
                a = a[sortConfig.key][0];
                b = b[sortConfig.key][0];
            } else if (sortConfig.key== "salaryMin" || sortConfig.key == "salaryMax") {
                a = a[sortConfig.key] ? a[sortConfig.key] * currencyConversion[a["salaryCurrency"]] : 0;
                b = b[sortConfig.key] ? b[sortConfig.key] * currencyConversion[b["salaryCurrency"]] : 0;
            } else {
                a = a[sortConfig.key];
                b = b[sortConfig.key];
            }
            if (a < b) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            } else if (a > b) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    const jobList = sortedJobs.map(job =>
        <tr key={job.id}>
            <td><a href={job.url} target="_blank">{job.jobTitle.replace("&amp;#8211;", "–").replace("&amp;#038;", "&")}</a></td>
            <td>{job.companyName.replace("&amp;#038;", "&")}</td>
            <td>{job.jobIndustry.join(", ").replace("&amp;", "&")}</td>
            <td>{job.jobType.join(", ")}</td>
            <td>{job.jobGeo}</td>
            <td>{job.jobLevel}</td>
            <td>{job.salaryMin ? job.salaryMin.toLocaleString() : ""} - {job.salaryMax ? job.salaryMax.toLocaleString() : ""} {job.salaryCurrency}</td>
        </tr>
    );

	return (
		<>
            <Bar options={options} data={data} />
            <table>
                <thead>
                    <tr>
                        <th><button type="button" onClick={() => requestSort('jobTitle')} className={getClassNamesFor('jobTitle')}>Job Title</button></th>
                        <th><button type="button" onClick={() => requestSort('companyName')} className={getClassNamesFor('companyName')}>Company Name</button></th>
                        <th><button type="button" onClick={() => requestSort('jobIndustry')} className={getClassNamesFor('jobIndustry')}>Industry</button></th>
                        <th><button type="button" onClick={() => requestSort('jobType')} className={getClassNamesFor('jobType')}>Job Type</button></th>
                        <th><button type="button" onClick={() => requestSort('jobGeo')} className={getClassNamesFor('jobGeo')}>Location</button></th>
                        <th><button type="button" onClick={() => requestSort('jobLevel')} className={getClassNamesFor('jobLevel')}>Job Level</button></th>
                        <th>Salary Range<br />
                        <button type="button" onClick={() => requestSort('salaryMin')} className={getClassNamesFor('salaryMin')}>Min</button><button type="button" onClick={() => requestSort('salaryMax')} className={getClassNamesFor('salaryMax')}>Max</button></th>
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