import React, { useContext, useEffect } from 'react';
import {
  Box, Button, Typography,
} from '@mui/material';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageIndex } from '../../reducers/MainReducer/Actions';

const NotFound = () => {
  const [state, d1] = useContext(MainContext);
  const { languageIndex, languages } = state;
  const language = languages[languageIndex];

  useEffect(() => {
    d1(setPageIndex(-1));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '85vh',
      }}
    >
      <Typography variant="h1">
        {language['404'].title}
      </Typography>
      <Typography variant="h6">
        {language['404'].message}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        {language['404'].backHome}
      </Button>
    </Box>
  );
};

export default NotFound;
