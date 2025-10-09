import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
        <li key={location.geoID}><NavLink to={location.geoSlug}>{location.geoName}</NavLink></li>
    )

	return (
		<>
            <NavBar />
            <main>
                <section className="link-sidebar">
                    <h3>Locations</h3>
                    <p>Click to load jobs</p>
                    <ul>{locationList}</ul>
                </section>
                <Outlet context={{category:"geo"}} />
            </main>
		</>
	)
}

export default Locations;