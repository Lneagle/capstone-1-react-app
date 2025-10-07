import { useEffect, useState } from "react";
import savedLocations from "../data/locations.json"
import savedIndustries from "../data/industries.json";
import NavBar from "../components/NavBar";
import JobList from "../components/JobList";

function Custom() {
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [keyword, setKeyword] = useState('');
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("https://jobicy.com/api/v2/remote-jobs?get=locations")
        .then(r => {
            if (!r.ok) { 
                setLocations(savedLocations.locations);
                //throw new Error("Could not fetch locations"); 
            }
            return r.json();
        })
        .then(data => {
            setLocations(data.locations);
        })
            .catch(console.log)
        }, []);

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

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleIndustryChange = (event) => {
        setSelectedIndustry(event.target.value);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://jobicy.com/api/v2/remote-jobs?geo=${selectedLocation}&industry=${selectedIndustry}&tag=${keyword}`)
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
    }

	return (
		<>
            <NavBar />
            <form onSubmit={handleSubmit}>
                <label htmlFor="location-select">Location:</label>
                <select id="location-select" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="">-- Choose location --</option>
                    {locations.map((location) => (
                        <option key={location.geoID} value={location.geoSlug}>
                            {location.geoName}
                        </option>
                    ))}
                </select>

                <label htmlFor="industry-select">Location:</label>
                <select id="industry-select" value={selectedIndustry} onChange={handleIndustryChange}>
                    <option value="">-- Choose industry --</option>
                    {industries.map((industry) => (
                        <option key={industry.industryID} value={industry.industrySlug}>
                            {industry.industryName}
                        </option>
                    ))}
                </select>

                <label htmlFor="search-term">Keyword:</label>
                <input id="search-term" type="text" value={keyword} onChange={handleKeywordChange} />

                <input type="submit" value="Submit" />
            </form>
            <JobList jobs={jobs} />
		</>
	)
}

export default Custom;