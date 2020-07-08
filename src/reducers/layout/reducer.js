import { handleActions } from 'redux-actions';

import * as actions from './actions';

const defaultState = {
  isDesktop: false
}

const reducer = handleActions(
  {
    [actions.SET_IS_DESKTOP]: (state, action) => ({
      isDesktop: action.payload
    })
  }
  , defaultState
  , actions.options
);

export default reducer;