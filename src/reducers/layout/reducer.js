import { handleActions } from 'redux-actions';

import actions from './actions';

const defaultState = {
  isDesktop: false
}

const reducer = handleActions(
  new Map([
    [
      actions.setIsDesktop,
      (state, action) => (
        Object.assign({}, state, {
          isDesktop: action.payload
        })
      )
    ]
  ])
  , defaultState
  , actions.options
);

export default reducer;