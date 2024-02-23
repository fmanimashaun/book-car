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
      <div className="lg:hidden">
        {' '}
        {/* Show only on small and medium screens */}
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
        {' '}
        {/* Show on medium and larger screens if isSidebarOpen is true */}
        <Sidebar />
      </div>
      <main className="flex-1 text-black overflow-auto">{renderContent()}</main>
    </>
  );
};

export default Layout;
