import { Link } from 'react-router-dom';
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
        <ul>
          <li className="bg-light-green px-4 py-2 font-bold text-white text-lg">
            <Link to="/">HOME</Link>
          </li>
          <li className="px-4 py-2 font-bold text-lg">
            <Link to="/login">LOGIN</Link>
          </li>
          <li className="px-4 py-2 font-bold text-lg">
            <Link to="/register">REGISTER</Link>
          </li>
        </ul>
      </nav>
    </aside>
  </>
);

export default SideNavBar;
