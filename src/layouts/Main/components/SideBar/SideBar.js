import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Profile, SidebarNav } from './components';

import clsx from 'clsx';

const styles = theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
});

const pages = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    Icon: DashboardIcon
  },
  {
    title: 'Users',
    href: '/users',
    Icon: PeopleIcon
  },
  {
    title: 'Products',
    href: '/products',
    Icon: ShoppingBasketIcon
  },
  {
    title: 'Authentication',
    href: '/sign-in',
    Icon: LockOpenIcon
  },
  {
    title: 'Typography',
    href: '/typography',
    Icon: TextFieldsIcon
  },
  {
    title: 'Icons',
    href: '/icons',
    Icon: ImageIcon
  },
  {
    title: 'Account',
    href: '/account',
    Icon: AccountBoxIcon
  },
  {
    title: 'Settings',
    href: '/settings',
    Icon: SettingsIcon
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {  }
  }
  render() {
    const {
      className,
      classes,
      open,
      variant,
      onClose,
      rest
    } = this.props;
    
    return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={ variant }
      >
        <div
          {...rest}
          className={ clsx(classes.root, className) }
        >
          <Profile />
          <Divider className={ classes.divider } />
          <SidebarNav
            className={ classes.nav }
            pages={ pages }
          />
        </div>
      </Drawer>
    );
  }
}
 
export default withStyles(styles, { withTheme: true })( SideBar);