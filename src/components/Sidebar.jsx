import { NavLink } from 'react-router-dom';
import Logo from 'assets/imgs/transparent-logo.png';

const SideNavBar = () => (
  <>
    <aside className="flex flex-col items-center w-60 text-dark-blue" aria-label="Sidebar">
      <div className="pb-12 pt-4 flex flex-col items-center">
        <img src={Logo} alt="logo" className="w-40" />
        <h1 className="text-light-green font-bold text-5xl text-center">
          Book
          <span className="font-medium">Car</span>
        </h1>
      </div>
      <nav className="w-full pl-8">
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  </>
);

export default SideNavBar;
