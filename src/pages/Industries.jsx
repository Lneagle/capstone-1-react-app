import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import savedIndustries from "../data/industries.json";
import NavBar from "../components/NavBar";

function Industries() {
	const [industries, setIndustries] = useState([]);

    useEffect(() => {
        fetch("https://jobicy.com/api/v2/remote-jobs?get=industries")
        .then(r => {
            if (!r.ok) { 
                setIndustries(savedIndustries.industries);
                //throw new Error("Could not fetch industries"); 
            }
            return r.json();
        })
        .then(data => {
            setIndustries(data.industries);
        })
        .catch(console.log);
    }, [])

    const industryList = industries.map(industry =>
        <li key={industry.industryID}><Link to={industry.industrySlug}>{industry.industryName.replace("&amp;amp;", "&")}</Link></li>
    );

	return (
		<>
            <NavBar />
            <ul>{industryList}</ul>
            <Outlet context={{category:"industry"}} />
		</>
	)
}

export default Industries;