import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { ApiContext } from '../../contexts/ApiContextProvider';
import Copyright from '../../components/Copyright';

const Register = () => {
  const [state, d1] = useContext(MainContext);
  const [api] = useContext(ApiContext);

  const { languageIndex, languages } = state;
  const { bearerToken } = api;

  const language = languages[languageIndex];
  const registerApi = api.baseUrl + api.authentication.baseUrl
    + api.authentication.endpoints.register;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordAgain) {
      setError(language.passwordsDoNotMatch);
      return;
    }

    setLoading(true);
    setError(null);

    const req = {
      username,
      email,
      firstName,
      lastName,
      password,
    };

    axios.post(registerApi, req)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response && err.response.data) {
          setError(err.response.data);
        } else if (err) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Close the snack bar
   */
  const closeSnackbar = () => {
    setError(null);
  };

  useEffect(() => {
    d1(setPageIndex(2));
  }, []);

  useEffect(() => {
    if (bearerToken && bearerToken.length > 0) {
      navigate('/');
    }
  }, [bearerToken]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {language.register}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={language.username}
            name="username"
            autoFocus
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={language.emailAddress}
            name="email"
            type="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstname"
            label={language.firstName}
            name="firstname"
            autoFocus
            value={firstName}
            disabled={loading}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastname"
            label={language.lastName}
            name="lastname"
            autoFocus
            value={lastName}
            disabled={loading}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={language.password}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordagain"
            label={language.password}
            type="password"
            id="passwordagain"
            autoComplete="current-password-again"
            value={passwordAgain}
            disabled={loading}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {language.register}
          </Button>
        </Box>
      </Box>
      <Copyright
        sx={{ mt: 3, mb: 4 }}
        company={language.app.companyName}
        link={language.app.link}
      />
      <Snackbar open={error && error.length > 0} autoHideDuration={10000} onClose={closeSnackbar}>
        <Alert elevation={6} variant="filled" severity="error" onClose={closeSnackbar}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
