import { createActions } from 'redux-actions';

export const SET_IS_DESKTOP = "SET_IS_DESKTOP";
export const options = {
  prefix: 'layout',
  namespace: '/'
}

const actions = createActions(
  {
    [SET_IS_DESKTOP]: [
      isDesktop => isDesktop,
      isDesktop => { key: "value", isDesktop }
    ],
  }
  , options
);

export default actions;