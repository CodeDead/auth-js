import React, { useContext, useEffect } from 'react';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, d1] = useContext(MainContext);

  useEffect(() => {
    d1(setPageIndex(0));
  }, []);

  return (
    <>
      Welcome home!
    </>
  );
};

export default Home;
