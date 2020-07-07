import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = ( props )=>{
  const {
    layout: Layout,
    component: Component,
    location,    
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout location={ location }>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;