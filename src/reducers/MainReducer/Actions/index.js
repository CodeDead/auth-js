import {
  SET_LANGUAGE_INDEX,
  SET_PAGE_BEFORE_LOGIN,
  SET_PAGE_INDEX,
  SET_THEME_COLOR_INDEX,
  SET_THEME_INDEX,
} from './actionTypes';

export const setLanguageIndex = (index) => ({
  type: SET_LANGUAGE_INDEX,
  payload: index,
});

export const setThemeIndex = (index) => ({
  type: SET_THEME_INDEX,
  payload: index,
});

export const setThemeColorIndex = (index) => ({
  type: SET_THEME_COLOR_INDEX,
  payload: index,
});

export const setPageBeforeLogin = (pageBeforeLogin) => ({
  type: SET_PAGE_BEFORE_LOGIN,
  payload: pageBeforeLogin,
});

export const setPageIndex = (pageIndex) => ({
  type: SET_PAGE_INDEX,
  payload: pageIndex,
});
