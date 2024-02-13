import { Link } from 'react-router-dom';

const SideNavBar = () => (
  <>
    <aside
      className="pl-4 py-4 w-60 bg-gray-700 text-white"
      aria-label="Sidebar"
    >
      <nav>
        <ul>
          <li className="bg-green-500">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </aside>
  </>
);

export default SideNavBar;
