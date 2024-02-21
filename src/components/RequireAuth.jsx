import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { checkExpiry } from 'helpers/decodeJwt';

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role, token } = useSelector((state) => state.auth);
  const isExpired = checkExpiry(token);

  if (isExpired) return <Navigate to="/login" />;

  if (!isLoggedIn) {
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
