export const AUTH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CHANGEPASS: '/auth/changepass',
  RESETPASS: '/auth/resetpass',
  CURRENTACCOUNT: '/auth/account',
  LOGOUT: '',
};

export const USERS = {
  CREATE_USER: 'users/create',
};

export const IMDB = {
  GET_POPULAR_EQ: 'movie/popular',
  GET_FAV_EQ: 'list/7072623',
  SET_FAV_EQ: 'list/7072623/items',
  REMOVE_FAV_EQ: 'list/7072623/items',
  GET_WATCHL_EQ: 'list/7072622',
  SET_WATCHL_EQ: 'list/7072622/items',
  REMOVE_WATCHL_EQ: 'list/7072622/items',
  SEARCH_MOVIES: 'search/movie',
};
