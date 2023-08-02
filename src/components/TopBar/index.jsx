import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerBar from '../DrawerBar';
import {
  setThemeIndex,
} from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { ApiContext } from '../../contexts/ApiContextProvider';
import ConfirmationDialog from '../ConfirmationDialog';
import { setBearerToken } from '../../reducers/ApiReducer/Actions';

const TopBar = () => {
  const [state, d1] = useContext(MainContext);
  const [api, d2] = useContext(ApiContext);

  const { languageIndex, themeIndex } = state;
  const { bearerToken } = api;
  const language = state.languages[languageIndex];

  const [logOutDialogOpen, setLogOutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Go to the home page
   */
  const gotoHome = () => {
    navigate('/');
  };

  /**
   * Display the sign out dialog confirmation
   */
  const onSigOut = () => {
    setLogOutDialogOpen(true);
  };

  /**
   * Close the logout confirmation dialog
   */
  const closeLogOutDialog = () => {
    setLogOutDialogOpen(false);
  };

  /**
   * Log out of the application
   */
  const signOut = () => {
    closeLogOutDialog();
    d2(setBearerToken(null, null));
    navigate('/login');
  };

  /**
   * Go to the login page
   */
  const gotoLogin = () => {
    navigate('/login');
  };

  /**
   * Change the theme colors
   */
  const changeTheme = () => {
    d1(setThemeIndex(themeIndex === 0 ? 1 : 0));
  };

  return (
    <AppBar position="static" style={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          sx={{
            marginRight: theme.spacing(1),
          }}
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{
            cursor: 'pointer',
          }}
          onClick={gotoHome}
        >
          {language.app.appName}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={changeTheme} color="inherit">
          {themeIndex === 0
            ? <Brightness7Icon />
            : <Brightness5Icon />}
        </IconButton>
        {bearerToken && bearerToken.length > 1 ? (
          <IconButton onClick={onSigOut} color="inherit">
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton onClick={gotoLogin} color="inherit">
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
      <DrawerBar open={drawerOpen} onClose={() => setDrawerOpen(false)} onSignOut={onSigOut} />
      <ConfirmationDialog
        onClose={closeLogOutDialog}
        open={logOutDialogOpen}
        onAccept={signOut}
        content={language.confirmLogout}
        title={language.confirmation}
        no={language.no}
        yes={language.yes}
      />
    </AppBar>
  );
};

export default TopBar;
