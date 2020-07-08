import { handleActions } from 'redux-actions';

import actions from './actions';

const defaultState = {
  isOpen: false
}

const reducer = handleActions(
  new Map([
    [
      actions.open,
      (state, action) => ({
        isOpen: true
      })
    ],
    [
      actions.close,
      (state, action) => ({
        isOpen: false
      })
    ],
    [
      actions.toggle,
      (state, action) => ({
        isOpen: !state.isOpen
      })
    ],
    [
      actions.setIsOpen,
      (state, action) => ({
        isOpen: action.payload
      })
    ]
  ])
  , defaultState
  , actions.options
);

export default reducer;