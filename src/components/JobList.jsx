import { useState } from 'react';
import currencyConversion from "../data/currencies.json";

function JobList({ jobs }) {
    const [sortConfig, setSortConfig] = useState(null);

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
            <table>
                <thead>
                    <tr>
                        <th>Title<br /><button type="button" onClick={() => requestSort('jobTitle')} className={getClassNamesFor('jobTitle')}>Sort</button></th>
                        <th>Company<br /><button type="button" onClick={() => requestSort('companyName')} className={getClassNamesFor('companyName')}>Sort</button></th>
                        <th>Industry<br /><button type="button" onClick={() => requestSort('jobIndustry')} className={getClassNamesFor('jobIndustry')}>Sort</button></th>
                        <th>Type<br /><button type="button" onClick={() => requestSort('jobType')} className={getClassNamesFor('jobType')}>Sort</button></th>
                        <th>Location<br /><button type="button" onClick={() => requestSort('jobGeo')} className={getClassNamesFor('jobGeo')}>Sort</button></th>
                        <th>Level<br /><button type="button" onClick={() => requestSort('jobLevel')} className={getClassNamesFor('jobLevel')}>Sort</button></th>
                        <th>Salary Range<br />
                        <button type="button" onClick={() => requestSort('salaryMin')} className={getClassNamesFor('salaryMin')}>Sort Min</button><button type="button" onClick={() => requestSort('salaryMax')} className={getClassNamesFor('salaryMax')}>Sort Max</button></th>
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