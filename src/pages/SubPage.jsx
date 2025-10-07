import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JobList from "../components/JobList";

function SubPage() {
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

	return (
		<>
            <JobList jobs={jobs} />
		</>
	)
}

export default SubPage;