import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar';

const Layout = () => (
  <>
    <Sidebar />
    <main className="flex-1 bg-gray-100 text-dark-blue p-4">
      <Outlet />
    </main>
  </>
);

export default Layout;
