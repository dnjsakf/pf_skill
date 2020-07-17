import { createActions } from 'redux-actions';

export const SELECT_ON_SIDE_BAR = "SELECT_ON_SIDE_BAR";
export const SELECT_ON_MENU_SETTINGS = "SELECT_ON_MENU_SETTINGS";

export const options = {
  prefix: 'menu',
  namespace: '/'
}

const actions = createActions(
  {
    [SELECT_ON_SIDE_BAR]: [
      payload => payload,
      payload => { target: "SideBar", payload }
    ],
    [SELECT_ON_MENU_SETTINGS]: [
      payload => payload,
      payload => { target: "MenuSettings", payload }
    ],
  }
  , options
);

export default actions;