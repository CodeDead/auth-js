import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ApiContext } from '../../contexts/ApiContextProvider';
import {
  setBearerToken, setPermissions,
} from '../../reducers/ApiReducer/Actions';
import LoadingBar from '../LoadingBar';
import { MainContext } from '../../contexts/MainContextProvider';
import { setPageBeforeLogin } from '../../reducers/MainReducer/Actions';

const ProtectedRoute = ({ children }) => {
  const [, d1] = useContext(MainContext);
  const [api, d2] = useContext(ApiContext);

  const { bearerToken } = api;
  const getCurrentUserApi = api.baseUrl + api.authentication.baseUrl
    + api.authentication.endpoints.getCurrentUser;

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /**
   * Get the current user
   */
  const getCurrentUser = () => {
    setError(null);

    axios.get(getCurrentUserApi, { headers: { Authorization: `Bearer ${bearerToken}` } })
      .then((res) => {
        const permissions = [];
        if (res.data.roles) {
          res.data.roles.forEach((e) => {
            if (e.permissions) {
              e.permissions.forEach((p) => {
                if (!permissions.includes(p.name)) {
                  permissions.push(p.name);
                }
              });
            }
          });
        }
        d2(setPermissions(permissions));
        setAllowed(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          d2(setBearerToken(null, null));
          navigate('/login');
        }
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Close the snackbar
   */
  const closeSnackbar = () => {
    setError(null);
  };

  useEffect(() => {
    if (bearerToken) {
      getCurrentUser();
    } else {
      d1(setPageBeforeLogin(window.location.href));
      navigate('/login');
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBar />
      ) : null}

      {allowed ? (
        children
      ) : null}

      {error ? (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={closeSnackbar}>
          <Alert elevation={6} variant="filled" severity="error" onClose={closeSnackbar}>
            {error.message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default ProtectedRoute;
