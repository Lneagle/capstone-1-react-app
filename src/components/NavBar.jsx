import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/locations">Search by Location</NavLink>
      <NavLink to="/industries">Search by Industry</NavLink>
      <NavLink to="/custom">Custom Search</NavLink>
    </nav>
  );
}

export default NavBar;