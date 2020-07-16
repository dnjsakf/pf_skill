/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));

/* Main Component */
const TabPanel = props => {
  /* Props */
  const { 
    children,
    selected,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();

  /* Renderer */
  return (
    <div
      role="tabpanel"
      hidden={ !selected }
      {...rest}
    >
    {
      selected && (
        <Box p={ 1 }>
          { children }
        </Box>
      )
    }
    </div>
  );
}

/* Main Component Settings */
TabPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  "aria-labelledby": PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

/* Exports */
export default TabPanel;