function JobList({ jobs }) {
    const jobList = jobs.map(job =>
        <li key={job.id}><a href={job.url} target="_blank">{job.jobTitle.replace("&amp;#8211;", "–")}</a></li>
    );

	return (
		<>
            <ul>
                {jobList}
            </ul>
		</>
	)
}

export default JobList;