import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import JobList from "../components/JobList";

function SubPage() {
	const { slug } = useParams();
	const { category } = useOutletContext();
	const [jobs, setJobs] = useState([]);
	const [isData, setIsData] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsData(false);
		setIsLoading(true);
		fetch(`https://jobicy.com/api/v2/remote-jobs?${category}=${slug}`)
			.then(r => {
				if (!r.ok) {
					throw new Error(`Could not fetch jobs for the ${category} "${slug}"`);
				}
				return r.json();
			})
			.then(data => {
				setJobs(data.jobs);
				setIsData(true);
				setIsLoading(false);
			})
			.catch(e => {
				setIsData(false);
				setIsLoading(false);
				document.querySelector('.error').textContent = e.message;
			});
	}, [slug]);

	return (
		<section>
			{isLoading && <p className="message">Fetching data...</p>}
			{!isData && <p className="error"></p>}
			{isData && <Chart jobs={jobs} />}
			{isData && <JobList jobs={jobs} />}
		</section>
	)
}

export default SubPage;