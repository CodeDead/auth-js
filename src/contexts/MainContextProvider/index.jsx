import React, { createContext, useReducer } from 'react';
import MainReducer from '../../reducers/MainReducer';

import enUs from '../../languages/en_us.json';

const languageIndex = localStorage.languageIndex && localStorage.languageIndex.length > 0
  ? parseFloat(localStorage.languageIndex)
  : 0;
const themeIndex = localStorage.themeIndex ? parseFloat(localStorage.themeIndex) : 0;
const themeColorIndex = localStorage.themeColorIndex ? parseFloat(localStorage.themeColorIndex) : 0;

const initState = {
  pageBeforeLogin: null,
  languageIndex,
  pageIndex: 0,
  languages: [
    enUs,
  ],
  themeIndex,
  themeColorIndex,
  themes: {
    defaultColor: '#1976d2',
  },
};

export const MainContext = createContext(initState);

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
