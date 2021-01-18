import actions from './actions';

interface LeadsReduer {
  loading: boolean;
  c2cloading: boolean;
}

const initialState: LeadsReduer = {
  loading: false,
  c2cloading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_FAV:
      console.log('reducor -> SET_FAV', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
