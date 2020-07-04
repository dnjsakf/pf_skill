import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

import clsx from 'clsx';

const styles = theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    }
  }

  render() { 
    const {
      theme,
      classes,
      className,
      onOpenSideBar,
      ...rest
    } = this.props;

    return  (
      <AppBar
        {...rest}
        className={ clsx( classes.root, className ) }
      >
        <Toolbar>
          <RouterLink to="/">
            <img
              alt="Logo"
              src="/public/images/logos/logo--white.svg"
            />
          </RouterLink>
          <div className={ classes.flexGrow } />
          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={ this.state.notifications.length }
                color="primary"
                variant="dot"
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
              onClick={ this.props.onOpenSideBar }
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  onOpenSideBar: PropTypes.func
};

export default withStyles(styles, { withTheme: true })( Header );