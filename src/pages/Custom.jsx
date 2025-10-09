import { useEffect, useState } from "react";
import savedLocations from "../data/locations.json"
import savedIndustries from "../data/industries.json";
import NavBar from "../components/NavBar";
import Chart from "../components/Chart";
import JobList from "../components/JobList";

function Custom() {
    const [locations, setLocations] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [keyword, setKeyword] = useState('');
    const [jobs, setJobs] = useState([]);
    const [isData, setIsData] = useState(null);

    useEffect(() => {
        fetch("https://jobicy.com/api/v2/remote-jobs?get=locations")
        .then(r => {
            if (!r.ok) { 
                setLocations(savedLocations.locations); 
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
                throw new Error(`${r} error: Could not fetch jobs`);
            }
            return r.json();
        })
        .then(data => {
            if (data["jobCount"] > 0) {
                setJobs(data.jobs);
                setIsData(true);
            } else {
                setIsData(false);
                throw new Error(`No jobs found for keyword "${keyword || 'none'}" in ${selectedIndustry || 'any'} industry in ${selectedLocation || 'any location'}`);
            }
        })
        .catch( e => {
            setIsData(false);
            document.querySelector('.error').textContent = e.message;
        })
    }

	return (
		<>
            <NavBar />
            <main>
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
                                {industry.industryName.replace("&amp;amp;", "&")}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="search-term">Keyword:</label>
                    <input id="search-term" type="text" value={keyword} onChange={handleKeywordChange} />

                    <input type="submit" value="Submit" />
                </form>
                {!isData && <p className="error"></p>}
                {isData && <Chart jobs={jobs} />}
                {isData && <JobList jobs={jobs} />}
            </main>
		</>
	)
}

export default Custom;