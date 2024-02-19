import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = ({ allowedRoles }) => {
  const isLogin = false;
  const role = '';

  if (!isLogin) {
    return <Navigate to="/login" />;
  } if (!allowedRoles.includes(role)) {
    return <Navigate to="/unathorised" />;
  }
  return <Outlet />;
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

RequireAuth.defaultProps = {
  allowedRoles: ['user'],
};

export default RequireAuth;
