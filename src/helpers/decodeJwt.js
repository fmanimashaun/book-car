import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  const decoded = jwtDecode(token);

  return {
    user: decoded.scp,
  };
};

export const checkExpiry = (token) => {
  if (!token) return true;

  const decoded = jwtDecode(token);

  const isExpired = decoded.exp < Date.now() / 1000;

  return isExpired;
};
