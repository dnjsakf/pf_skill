import { handleActions } from 'redux-actions';

import actions from './actions';

const defaultState = {
  isOpen: false,
  selected: {
    group: "",
    name: "",
    label: "",
    href: "",
    icon: "",
  }
}

const reducer = handleActions(
  new Map([
    [
      actions.setOpen,
      (state, action) => {
        return Object.assign({}, state, {
          isOpen: true
        })
      }
    ],
    [
      actions.setClose,
      (state, action) => {
        return Object.assign({}, state, {
          isOpen: false
        })
      }
    ],
    [
      actions.setToggle,
      (state, action) => {
        return Object.assign({}, state, {
          isOpen: !state.isOpen
        })
      }
    ],
    [
      actions.setIsOpen,
      (state, action) => {
        return Object.assign({}, state, {
          isOpen: action.payload
        })
      }
    ],
    [
      actions.setSelected,
      (state, action) => {
        return Object.assign({}, state, {
          selected: action.payload
        })
      }
    ]
  ])
  , defaultState
  , actions.options
);

export default reducer;