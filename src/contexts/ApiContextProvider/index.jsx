import React, { createContext, useReducer } from 'react';
import ApiReducer from '../../reducers/ApiReducer';

const token = localStorage.bearerToken && localStorage.bearerToken !== 'null' ? localStorage.bearerToken : undefined;

const initState = {
  baseUrl: 'http://localhost:8080',
  authentication: {
    baseUrl: '/authentication',
    endpoints: {
      login: '/login',
      getCurrentUser: '/current',
    },
  },
  users: {
    baseUrl: '/users',
    endpoints: {
      list: '/',
      get: '/{id}',
      create: '/',
      update: '/{id}',
      delete: '/{id}',
    },
  },
  roles: {
    baseUrl: '/roles',
    endpoints: {
      list: '/',
      get: '/{id}',
      create: '/',
      update: '/{id}',
      delete: '/{id}',
    },
  },
  permissions: {
    baseUrl: '/permissions',
    endpoints: {
      list: '/',
      get: '/{id}',
      create: '/',
      update: '/{id}',
      delete: '/{id}',
    },
  },
  bearerToken: token,
  currentUser: {
    permissions: [],
  },
};

export const ApiContext = createContext(initState);

const ApiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ApiContext.Provider value={[state, dispatch]}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
