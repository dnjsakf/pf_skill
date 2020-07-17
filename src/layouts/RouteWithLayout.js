/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Route } from 'react-router-dom';

/* Material-UI */
import withWidth from '@material-ui/core/withWidth';

/* Main Component */
const RouteWithLayout = props =>{
  /* Props */
  const {
    layout: Layout,
    component: Component,
    location,
    width,
    ...rest
  } = props;

  /* Renderer */
  return (
    <Route
      {...rest}
      render={ matchProps => (
        <Layout location={ location } width={ width }>
          <Component { ...matchProps } />
        </Layout>
      )}
    />
  );
};

/* Main Component Settings */
RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  width: PropTypes.string,
};

/* Exports */
export default withWidth()( RouteWithLayout );