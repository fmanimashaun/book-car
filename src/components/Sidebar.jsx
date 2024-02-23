import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from 'assets/imgs/transparent-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/redux/auth/authSlice';

const SideNavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-0 left-0 z-50 p-4 focus:outline-none"
        >
          {isSidebarOpen ? (
            <>
              <div className="absolute m-1 bg-black h-[2px] w-5 transform transition-all duration-300 rotate-45 delay-100" />
              <div className="absolute m-1 bg-black h-[2px] w-5 transform transition-all duration-300 -rotate-45 delay-100" />
            </>
          ) : (
            <>
              <div className="bg-black h-[2px] w-7 m-1 transform transition-all duration-300 origin-top-left group-focus:translate-y-6" />
              <div className="bg-black h-[2px] w-7 m-1 transform transition-all duration-300 origin-top-left group-focus:translate-y-6" />
              <div className="bg-black h-[2px] w-7 m-1 transform transition-all duration-300 origin-top-left group-focus:translate-y-6" />
            </>
          )}
        </button>
      </div>
      <div className={`lg:block lg:relative w-2/3 md:w-65 lg:w-64 lg:flex-none bg-white z-40 ${isSidebarOpen ? 'absolute' : 'hidden'}`}>
        <aside className="flex flex-col pt-10 lg:p-auto items-center w-100 lg:w-60 h-screen border-r-2" aria-label="Sidebar">
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
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  CARS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reservations"
                  className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  MY RESERVATION
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact="true"
                  to="/reservations/new"
                  className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  RESERVE A CAR
                </NavLink>
              </li>
              {isLoggedIn && role === 'admin' && (
                <>
                  <li>
                    <NavLink
                      to="/cars/new"
                      className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      ADD CAR
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cars/delete"
                      className={({ isActive }) => (isActive ? 'w-full inline-block bg-light-green px-4 py-2 font-bold text-white text-lg' : 'w-full inline-block px-4 py-2 hover:bg-light-green hover:text-white font-bold text-lg')}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      DELETE CAR
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="mt-auto">
            {!isLoggedIn ? (
              <p className="text-center pb-4">
                <Link to="/login" className="font-bold text-lg" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  LOGIN
                </Link>
                <span className="text-lg"> / </span>
                <Link to="/register" className="font-bold text-lg" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  REGISTER
                </Link>
              </p>
            ) : (
              <p className="text-center pb-4">
                <button
                  type="button"
                  className="font-bold text-lg"
                  onClick={() => {
                    dispatch(logout());
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  LOGOUT
                </button>
              </p>
            )}
            <div>
              <p className="text-center"><a href="localhost:4000/api-doc" className="text-dark-blue">API Documentation</a></p>
              <p className="text-center text-dark-blue">&copy; 2024 BookCar</p>
              <p className="text-center text-dark-blue">All rights reserved</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideNavBar;
