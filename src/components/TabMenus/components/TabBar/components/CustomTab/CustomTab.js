/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import Tab from '@material-ui/core/Tab';

/* Style Hook */
const useStyles = makeStyles( theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}));

/* Main Component */
const CustomTab = props => {
  /* Props */
  const {
    ...rest
  } = props;

  /* Hooks */
  const classes = useStyles();

  /* Renderer */
  return (
    <Tab
      disableRipple
      classes={ classes }
      {...props}
    />
  );
}

/* Main Component Settings */
CustomTab.propTypes = {
}

/* Exports */
export default CustomTab;