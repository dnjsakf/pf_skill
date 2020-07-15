/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/* Main Component */
const TabPanel = props => {
  const { 
    children,
    selected,
    ...rest
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={ !selected }
      {...rest}
    >
    {
      selected && (
        <Box p={ 3 }>
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