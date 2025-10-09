import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
        <li key={industry.industryID}><NavLink to={industry.industrySlug}>{industry.industryName.replace("&amp;amp;", "&")}</NavLink></li>
    );

	return (
		<>
            <NavBar />
            <main className="flex">
                <section className="link-sidebar">
                    <h3>Industries</h3>
                    <p>Click to load jobs</p>
                    <ul>{industryList}</ul>
                </section>
                <Outlet context={{category:"industry"}} />
            </main>
		</>
	)
}

export default Industries;