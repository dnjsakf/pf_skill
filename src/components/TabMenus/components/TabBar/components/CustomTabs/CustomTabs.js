/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';

/* Style Hook */
const useStyles = makeStyles( theme => ({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
}));

/* Main Component */
const CustomTabs = props => {
  /* Props */
  const {
    ...rest
  } = props;

  /* Hooks */
  const classes = useStyles();

  /* Renderer */
  return (
    <Tabs 
      classes={ classes }
      { ...props }
    />
  );
}

/* Main Component Settings */
CustomTabs.propTypes = {
}

/* Exports */
export default CustomTabs;