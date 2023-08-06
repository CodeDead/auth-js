import {
  SET_BEARER_TOKEN,
  SET_CURRENT_USER,
  SET_PERMISSIONS,
} from './actionTypes';

export const setBearerToken = (token, remember) => ({
  type: SET_BEARER_TOKEN,
  payload: { token, remember },
});

export const setPermissions = (permissions) => ({
  type: SET_PERMISSIONS,
  payload: permissions,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
