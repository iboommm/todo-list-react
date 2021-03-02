import React, { useContext, createContext, useState } from 'react';
import { apiPost, setToken } from '../api/connect';

const authContext = createContext();

export const useProvideAuth = () => {
  const getUser = localStorage.getItem('username') || null;
  const [user, setUser] = useState(getUser);

  const signin = async (username, password, cb) => {
    apiPost('/users/auth', { username, password })
      .then((result) => {
        if (result.status === 200) {
          setUser(username);
          localStorage.setItem('username', username);
          localStorage.setItem('isAuthenticated', 1);
          localStorage.setItem('user-token', result.data.token);
          setToken(result.data.token);
          cb({ valid: true, msg: '' });
        }
      })
      .catch((error) => {
        let msg = '';
        if (error.toString().includes('401')) {
          msg = 'Username or password has wrong.';
        }
        cb({ valid: false, msg });
      });
  };

  const signout = (cb) => {
    setUser(null);
    localStorage.clear();
    cb();
  };

  return {
    user,
    signin,
    signout,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const isAuthenticated = () => {
  if (
    localStorage.getItem('username') &&
    localStorage.getItem('isAuthenticated') === '1'
  ) {
    setToken(localStorage.getItem('user-token'));
    return true;
  }
  return false;
};
