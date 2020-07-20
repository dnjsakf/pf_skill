/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Redux */
import { useDispatch } from 'react-redux';
import sideBarAction from '@reducers/sidebar/actions';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

/* Another Modules */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

/* Main Component */
const Header = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;
  
  /* State */
  const [ notifications, setNotifications ] = useState([]);
  
  /* Styles Hook */
  const classes = useStyles();

  /* Redux Hook */
  const dispatch = useDispatch();
  
  /* Handlers */
  const handleOpenSideBar = useCallback( event => {
    dispatch( sideBarAction.setOpen() );
  }, [ dispatch ]);  
  
  /* Renderer */
  return (
    <AppBar
      {...rest}
      className={ clsx( classes.root, className ) }
    >
      <Toolbar>
        <RouterLink to="/home">
          <img
            alt="Logo"
            src="/public/images/logos/Pokemon.png"
            height="50px"
          />
        </RouterLink>
        <div className={ classes.flexGrow } />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={ notifications.length }
              color="error"
              variant="standard"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={ classes.signOutButton }
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={ handleOpenSideBar }
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

/* Main Component Settings */
Header.propTypes = {
  className: PropTypes.string,
}

/* Exports */
export default Header;