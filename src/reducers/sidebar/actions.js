import { createActions } from 'redux-actions';

export const SET_OPEN = "SET_OPEN";
export const SET_CLOSE = "SET_CLOSE";
export const SET_TOGGLE = "SET_TOGGLE";
export const SET_IS_OPEN = "SET_IS_OPEN";
export const SET_SELECTED = "SET_SELECTED";

export const options = {
  prefix: 'sidebar',
  namespace: '/'
}

const actions = createActions(
  {
    [SET_OPEN]: undefined,
    [SET_CLOSE]: undefined,
    [SET_TOGGLE]: undefined,
    [SET_IS_OPEN]: [
      isOpen => isOpen,
      isOpen => { key: "value", isOpen }
    ],
    [SET_SELECTED]: [
      selected => selected,
      selected => { key: "value", selected }
    ]
  }
  , options
);

export default actions;