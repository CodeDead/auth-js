import {
  SET_LANGUAGE_INDEX,
  SET_PAGE_BEFORE_LOGIN,
  SET_PAGE_INDEX,
  SET_THEME_COLOR_INDEX,
  SET_THEME_INDEX,
} from './Actions/actionTypes';

const MainReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE_INDEX:
      localStorage.languageIndex = action.payload;
      return {
        ...state,
        languageIndex: action.payload,
      };
    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      };
    case SET_THEME_INDEX:
      localStorage.themeIndex = action.payload;
      return {
        ...state,
        themeIndex: action.payload,
      };
    case SET_THEME_COLOR_INDEX:
      localStorage.themeColorIndex = action.payload;
      return {
        ...state,
        themeColorIndex: action.payload,
      };
    case SET_PAGE_BEFORE_LOGIN:
      return {
        ...state,
        pageBeforeLogin: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
