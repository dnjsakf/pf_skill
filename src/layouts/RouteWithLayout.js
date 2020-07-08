import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import withWidth from '@material-ui/core/withWidth';


const RouteWithLayout = props =>{
  const {
    layout: Layout,
    component: Component,
    location,
    width,
    ...rest
  } = props;

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

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  width: PropTypes.string,
};

export default withWidth()( RouteWithLayout );