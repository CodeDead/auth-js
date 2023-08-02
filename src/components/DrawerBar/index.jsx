import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import { MainContext } from '../../contexts/MainContextProvider';
import { ApiContext } from '../../contexts/ApiContextProvider';

const DrawerBar = ({
  open,
  onClose,
  onSignOut,
}) => {
  const [state] = useContext(MainContext);
  const [api] = useContext(ApiContext);

  const language = state.languages[state.languageIndex];

  const { pageIndex } = state;
  const { bearerToken } = api;

  const theme = useTheme();
  const navigate = useNavigate();

  /**
   * Function that is called when the drawer should close
   */
  const handleDrawerClose = () => {
    if (onClose) onClose();
  };

  /**
   * Go to the home page
   */
  const goHome = () => {
    handleDrawerClose();
    navigate('/');
  };

  /**
   * Go to the login page
   */
  const goToLogin = () => {
    handleDrawerClose();
    navigate('/login');
  };

  /**
   * Go to the register page
   */
  const goToRegister = () => {
    handleDrawerClose();
    navigate('/register');
  };

  /**
   * Go to the settings page
   */
  const goToSettings = () => {
    handleDrawerClose();
    navigate('/settings');
  };

  /**
   * Sign out
   */
  const signOut = () => {
    if (onSignOut) onSignOut();
    handleDrawerClose();
  };

  const settingsItem = (
    <ListItem disablePadding>
      <ListItemButton onClick={goToSettings} selected={pageIndex === 2}>
        <ListItemIcon><SettingsIcon color="inherit" /></ListItemIcon>
        <ListItemText>{language.settings}</ListItemText>
      </ListItemButton>
    </ListItem>
  );

  const drawerItems = bearerToken && bearerToken.length > 0 ? (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={goHome} selected={pageIndex === 0}>
            <ListItemIcon><HomeIcon color="inherit" /></ListItemIcon>
            <ListItemText>{language.home}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {settingsItem}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={signOut}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText>{language.logout}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  ) : (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={goToLogin} selected={pageIndex === 1}>
            <ListItemIcon><LockIcon /></ListItemIcon>
            <ListItemText>{language.logIn}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={goToRegister} selected={pageIndex === 2}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText>{language.register}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {settingsItem}
      </List>
    </>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
        }}
      >
        {drawerItems}
      </Box>
    </Drawer>
  );
};

export default DrawerBar;
