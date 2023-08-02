import React, { useContext, useEffect } from 'react';
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
import { setPageIndex } from '../../reducers/MainReducer/Actions';
import { MainContext } from '../../contexts/MainContextProvider';
import Copyright from '../../components/Copyright';

const Login = () => {
  const [state, d1] = useContext(MainContext);
  const { languageIndex, languages } = state;

  const language = languages[languageIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  useEffect(() => {
    d1(setPageIndex(1));
  }, []);

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
            id="email"
            label={language.emailAddress}
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={language.rememberMe}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
    </Container>
  );
};

export default Login;
