import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from "react-apollo";
import { GET_SIDE_BAR_MENUS } from './graphql/queries';

import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import clsx from 'clsx';

import SideBarNavItem from './components/SideBarNavItem';

const useStyles = makeStyles((theme)=>({
  root: {},
}));

const SidebarNav = ( props )=>{
  const {
    className,
    loading,
    error,
    menus,
    ...rest
  } = props;

  const classes = useStyles();

  if ( loading ) return ( <h3>SideBar Loadding...</h3> );
  if ( error ) return `Error! ${error.message}`;
  
  return (
    <List
      {...rest}
      className={ clsx( classes.root, className )}
      aria-labelledby="nested-sidebar-menu"
      subheader={
        <ListSubheader component="div" id="nested-sidebar-menu">
          Menus
        </ListSubheader>
      }
    >
    {
      menus && menus.map(( options )=>{
        return ( <SideBarNavItem key={ options.title } { ...options } /> )
      })
    }
    </List>
  );
}

SidebarNav.propTypes = {
  className: PropTypes.string,
};

export default graphql(
  GET_SIDE_BAR_MENUS, {
    fetchPolicy: "cache-and-network",
    props: ({ data: { loading, error, sideBarMenus }}) => ({
      loading,
      error,
      menus: sideBarMenus,
    }),
  }
)( SidebarNav );;