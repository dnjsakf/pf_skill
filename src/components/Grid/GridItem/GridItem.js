/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import Grid from '@material-ui/core/Grid';

/* Main Component */
const GridItem = props => {
  /* Props */
  const {
    children,
    ...rest
  } = props;

  return (
    <Grid item { ...rest } >
      { children }
    </Grid>
  );
}

/* Main Component Settings */
GridItem.propTypes = {}

/* Exports */
export default GridItem;