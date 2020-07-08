import { handleActions } from 'redux-actions';

import * as actions from './actions';

const defaultState = {
  isOpen: false
}

const reducer = handleActions(
  {
    [actions.OPEN]: (state, action) => ({
      isOpen: true
    })
    , [actions.CLOSE]: (state, action) => ({
      isOpen: false
    })
    , [actions.TOGGLE]: (state, action) => ({
      isOpen: !state.isOpen
    })
    , [actions.SET_IS_OPEN]: (state, action) => ({
      isOpen: action.payload
    })
  }
  , defaultState
  , actions.options
);

export default reducer;