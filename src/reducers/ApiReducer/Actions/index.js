import {
  SET_BEARER_TOKEN,
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
