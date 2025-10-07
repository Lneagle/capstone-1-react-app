import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import savedLocations from "../data/locations.json"
import NavBar from "../components/NavBar"

function Locations() {
    const [locations, setLocations] = useState([]);

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
    }, [])

    const locationList = locations.map(location =>
        <li key={location.geoID}><Link to={location.geoSlug}>{location.geoName}</Link></li>
    )

	return (
		<>
            <NavBar />
            <ul>{locationList}</ul>
            <Outlet context={{category:"geo"}} />
		</>
	)
}

export default Locations;