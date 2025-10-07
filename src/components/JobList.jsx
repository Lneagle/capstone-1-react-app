import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function JobList() {
    const { slug } = useParams();
    const { category } = useOutletContext();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`https://jobicy.com/api/v2/remote-jobs?${category}=${slug}`)
        .then(r => {
            if (!r.ok) { 
                throw new Error("Could not fetch jobs") 
            }
            return r.json();
        })
        .then(data => {
            setJobs(data.jobs)
        })
        .catch(console.log)
    }, [slug]);

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