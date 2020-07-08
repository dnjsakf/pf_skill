import { createActions } from 'redux-actions';

export const OPEN = "OPEN";
export const CLOSE = "CLOSE";
export const TOGGLE = "TOGGLE";
export const SET_IS_OPEN = "SET_IS_OPEN";

export const options = {
  prefix: 'sidebar',
  namespace: '/'
}

const actions = createActions(
  {
    [OPEN]: undefined,
    [CLOSE]: undefined,
    [TOGGLE]: undefined,
    [SET_IS_OPEN]: [
      isOpen => isOpen,
      isOpen => { key: "value", isOpen }
    ],
  }
  , options
);

export default actions;