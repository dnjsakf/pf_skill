import { createActions } from 'redux-actions';

import * as actions from './actions';

const actionCreators = createActions(
  {
    [actions.SET_IS_DESKTOP]: [
      isDesktop => isDesktop,
      isDesktop => { key: "value", isDesktop }
    ],
  }
  , actions.options
);

export default actionCreators;