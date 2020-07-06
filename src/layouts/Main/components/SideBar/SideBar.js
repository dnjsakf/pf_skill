import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';

import { graphql } from "react-apollo";
import { GET_SIDE_BAR_MENUS } from './graphql/queries';

import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

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


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {}
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
    
    const SideBarNavWithQuery = graphql(
      GET_SIDE_BAR_MENUS, {
        props: ({ data: { loading, error, sideBarMenus }}) => ({
          loading,
          error,
          data: sideBarMenus
        }),
      }
    )(SidebarNav);

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
          <SideBarNavWithQuery />
        </div>
      </Drawer>
    );
  }
}
 
export default withStyles(styles, { withTheme: true })( SideBar );