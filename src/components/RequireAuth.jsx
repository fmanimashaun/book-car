import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { checkExpiry } from 'helpers/decodeJwt';

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isExpired = checkExpiry(user.token);

  if (isExpired) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unathorised" replace />;
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
