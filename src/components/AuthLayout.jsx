import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <main className="flex-1 bg-gray-100 text-dark-blue p-4" style={{ overflowY: 'scroll' }}>
    <Outlet />
  </main>
);

export default AuthLayout;
