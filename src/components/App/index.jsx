import React, { Suspense, useContext, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeSelector from '../../utils/ThemeSelector';
import { MainContext } from '../../contexts/MainContextProvider';
import TopBar from '../TopBar';
import LoadingBar from '../LoadingBar';
import ProtectedRoute from '../ProtectedRoute';

const Home = lazy(() => import('../../routes/Home'));
const NotFound = lazy(() => import('../../routes/NotFound'));
const Login = lazy(() => import('../../routes/Login'));
const Register = lazy(() => import('../../routes/Register'));

const App = () => {
  const [state] = useContext(MainContext);
  const {
    themeIndex,
    themeColorIndex,
  } = state;

  let themeType = 'light';
  if (themeIndex === 1) {
    themeType = 'dark';
  }

  const color = ThemeSelector(themeColorIndex, state.themes.defaultColor);

  const theme = createTheme({
    palette: {
      primary: color,
      mode: themeType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <TopBar />
        <CssBaseline />
        <Suspense fallback={<LoadingBar />}>
          <Routes>
            <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
