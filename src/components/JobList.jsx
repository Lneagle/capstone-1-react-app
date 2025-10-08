function JobList({ jobs }) {
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