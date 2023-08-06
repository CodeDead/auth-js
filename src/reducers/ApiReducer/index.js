import {
  SET_BEARER_TOKEN, SET_CURRENT_USER, SET_PERMISSIONS,
} from './Actions/actionTypes';

const ApiReducer = (state, action) => {
  switch (action.type) {
    case SET_BEARER_TOKEN:
      if (!action.payload.token) {
        localStorage.removeItem('bearerToken');
      } else if (action.payload.remember) {
        localStorage.bearerToken = action.payload.token;
      }
      return {
        ...state,
        bearerToken: action.payload.token,
      };
    case SET_PERMISSIONS:
      return {
        ...state,
        userPermissions: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default ApiReducer;
