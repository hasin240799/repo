import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      window.history.go('/login'); // Redirect to login page if not authenticated
    }
  }, [history]);

  return isAuthenticated;
};
