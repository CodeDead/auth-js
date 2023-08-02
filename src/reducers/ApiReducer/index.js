import {
  SET_BEARER_TOKEN, SET_PERMISSIONS,
} from './Actions/actionTypes';

const ApiReducer = (state, action) => {
  switch (action.type) {
    case SET_BEARER_TOKEN:
      if (!action.payload.token) {
        localStorage.removeItem('bearerToken');
      } else if (action.payload.remember) {
        localStorage.bearerToken = action.payload;
      }
      return {
        ...state,
        bearerToken: action.payload,
      };
    case SET_PERMISSIONS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          permissions: action.payload,
        },
      };
    default:
      return state;
  }
};

export default ApiReducer;
