/* eslint-disable react-hooks/rules-of-hooks */
import jwtDecode from 'jwt-decode';
import useToken from '../services/token.services';

export default function auth() {
  const { token } = useToken();
  const isAuthenticated = () => {
    if (token) {
      return true;
    }
    return false;
  };
  const isAdmin = () => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    if (decoded.isAdmin) return true;
    return false;
  };
  return { isAuthenticated, isAdmin };
}
