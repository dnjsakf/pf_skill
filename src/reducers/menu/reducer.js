import { handleActions } from 'redux-actions';

import actions from './actions';


const initData = {
  id: "",
  group: "",
  name: "",
  label: "",
  href: "",
  icon: "",
}

const defaultState = {
  sideBar: initData,
  menuSettings: initData,
}

const reducer = handleActions(
  new Map([
    [
      actions.selectOnSideBar,
      (state, action) => (
        Object.assign({}, state, {
          sideBar: action.payload
        })
      ),
    ],
    [
      actions.selectOnMenuSettings,
      (state, action) => (
        Object.assign({}, state, {
          menuSettings: action.payload
        })
      ),
    ]
  ])
  , defaultState
  , actions.options
);

export default reducer;