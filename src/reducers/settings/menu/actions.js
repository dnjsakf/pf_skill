import { createActions } from 'redux-actions';

export const SET_MENU = "SET_MENU";
export const options = {
  prefix: 'settings/menu',
  namespace: '/'
}

const actions = createActions(
  {
    [SET_MENU]: [
      payload => payload,
      payload => { key: "value", payload }
    ],
  }
  , options
);

export default actions;