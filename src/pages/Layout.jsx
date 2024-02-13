import { Outlet } from 'react-router-dom';
import SideNavBar from 'components/SideNavBar';

const Layout = () => (
  <>
    <SideNavBar />
    <main className="flex-1 bg-gray-600 text-white p-4">
      <Outlet />
    </main>
  </>
);

export default Layout;
