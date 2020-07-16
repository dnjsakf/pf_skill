/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import Grid from '@material-ui/core/Grid';

/* Main Component */
const GridContainer = props => {
  /* Props */
  const {
    children,
    ...rest
  } = props;

  return (
    <Grid container { ...rest } >
      { children }
    </Grid>
  );
}

/* Main Component Settings */
GridContainer.propTypes = {}

/* Exports */
export default GridContainer;