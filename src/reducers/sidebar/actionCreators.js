import { createActions } from 'redux-actions';

import * as actions from './actions';

const actionCreators = createActions(
  {
    [actions.OPEN]: undefined,
    [actions.CLOSE]: undefined,
    [actions.TOGGLE]: undefined,
    [actions.SET_IS_OPEN]: [
      isOpen => isOpen,
      isOpen => { key: "value", isOpen }
    ],
  }
  , actions.options
);

/*
expect(actionCreators.sidebar.openSideBar).to.deep.equal({
  type: actions.SET_IS_OPEN,
  payload: { isOpen: true },
  meta: { key: 'value', isOpen: false }
});
*/

export default actionCreators;