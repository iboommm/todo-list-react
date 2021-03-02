import React, { useContext, createContext, useState } from 'react';
import { apiPost, setToken } from '../api/connect';

const authContext = createContext();

export const useProvideAuth = () => {
  const getUser = localStorage.getItem('username') || null;
  const [user, setUser] = useState(getUser);

  const signin = async (username, password, cb) => {
    return await Auth.signin(async () => {
      const result = await apiPost('/users/auth', { username, password });
      if (result.status === 200) {
        setUser(username);
        localStorage.setItem('username', username);
        localStorage.setItem('isAuthenticated', 1);
        localStorage.setItem('user-token', result.data.token);
        setToken(result.data.token);
      }
      cb();
    });
  };

  const signout = (cb) => {
    return Auth.signout(() => {
      setUser(null);
      localStorage.clear();
      cb();
    });
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

export const Auth = {
  isAuthenticated: false,
  async signin(cb) {
    setTimeout(cb, 100);
  },
  signout(cb) {
    setTimeout(cb, 100);
  },
};
