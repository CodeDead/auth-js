import React, { useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import { ApiContext } from '../../contexts/ApiContextProvider';
import Copyright from '../../components/Copyright';
import { setBearerToken } from '../../reducers/ApiReducer/Actions';

const Login = () => {
  const [state, d1] = useContext(MainContext);
  const [api, d2] = useContext(ApiContext);

  const { pageBeforeLogin, languageIndex, languages } = state;
  const { bearerToken } = api;

  const language = languages[languageIndex];
  const loginApi = api.baseUrl + api.authentication.baseUrl + api.authentication.endpoints.login;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /**
   * Handle the submit event
   * @param event The submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const req = {
      username,
      password,
    };

    axios.post(loginApi, req)
      .then((res) => {
        if (res.data && res.data.token) {
          d2(setBearerToken(res.data.token, rememberMe));

          if (pageBeforeLogin && pageBeforeLogin.length > 0) {
            window.location.href = pageBeforeLogin;
          } else {
            navigate('/');
          }
        }
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
    d1(setPageIndex(1));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {language.signIn}
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
            name="password"
            label={language.password}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={(
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                disabled={loading}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
          )}
            label={language.rememberMe}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {language.logIn}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                {language.forgotPassword}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {language.register}
              </Link>
            </Grid>
          </Grid>
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

export default Login;
