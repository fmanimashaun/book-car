import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppData } from 'app/redux/AppDataSlice';
import Sidebar from 'components/Sidebar';

const Layout = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appData);

  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAppData());
  }, [dispatch]);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <div>
          Error:
          {error}
        </div>
      );
    }

    return <Outlet />;
  };

  return (
    <>
      <div className="md:hidden">
        {' '}
        {/* Show only on small screens */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-0 left-0 z-50 p-4 focus:outline-none"
        >
          {isSidebarOpen ? 'Close' : 'Open'}
          <br />
          Menu
        </button>
      </div>
      <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {' '}
        {/* Show on medium and larger screens if isSidebarOpen is true */}
        <Sidebar />
      </div>
      <main className="flex-1 text-black p-4 overflow-auto">{renderContent()}</main>
    </>
  );
};

export default Layout;
