import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);

  return {
    user: decoded.scp,
  };
};

export const checkExpiry = (token) => {
  const decoded = jwtDecode(token);

  const isExpired = decoded.exp < Date.now();

  return isExpired;
};
