import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import JobList from "../components/JobList";

function SubPage() {
	const { slug } = useParams();
	const { category } = useOutletContext();
	const [jobs, setJobs] = useState([]);
	const [isData, setIsData] = useState(false);

	useEffect(() => {
		setIsData(false);
		document.querySelector('.message').textContent = "Fetching results...";
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
			})
			.catch(e => {
				setIsData(false);
				document.querySelector('.message').textContent = e.message;
			});
	}, [slug]);

	return (
		<section>
			{!isData && <p className="message"></p>}
			{isData && <Chart jobs={jobs} />}
			{isData && <JobList jobs={jobs} />}
		</section>
	)
}

export default SubPage;