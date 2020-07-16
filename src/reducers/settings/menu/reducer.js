import { handleActions } from 'redux-actions';

import actions from './actions';

const defaultState = {
  group: "",
  name: "",
  label: "",
  href: "",
  icon: "",
}

const reducer = handleActions(
  new Map([
    [
      actions.setMenu,
      (state, action) => (
        Object.assign({}, state, action.payload)
      )
    ]
  ])
  , defaultState
  , actions.options
);

export default reducer;