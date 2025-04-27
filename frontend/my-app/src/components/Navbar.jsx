import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Student Records</h1>
      <div className="nav-links">
        <Link to="/">View Students</Link>
        <Link to="/add">Add Student</Link>
      </div>
    </nav>
  );
}

export default Navbar;