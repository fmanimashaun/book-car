import { NavLink, Link } from 'react-router-dom';
import Logo from 'assets/imgs/transparent-logo.png';

const SideNavBar = () => (
  <>
    <aside className="flex flex-col items-center w-60 text-dark-blue" aria-label="Sidebar">
      <div className="pb-12 pt-4">
        <Link to="/" className="flex flex-col items-center">
          <img src={Logo} alt="logo" className="w-40" />
          <h1 className="text-light-green font-bold text-5xl text-center">
            Book
            <span className="font-medium">Car</span>
          </h1>
        </Link>
      </div>
      <nav className="w-full pl-8">
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
              end
            >
              CARS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
              end
            >
              MY RESERVATION
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/reservations/new"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              RESERVE A CAR
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars/new"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              ADD CAR
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars/delete"
              className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
            >
              DELETE CAR
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  </>
);

export default SideNavBar;
