import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { graphql } from "react-apollo";
import { GET_SIDE_BAR_MENUS } from './graphql/queries';

import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import SideBarNavItem from './components/SideBarNavItem';
import CircularProgress from 'components/Progress/CircularProgress';

const styles = theme => ({
  root: {},
});

class SidebarNav extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {}
  }
  
  render(){
    const {
      classes,
      className,
      loading,
      error,
      menus,
      ...rest
    } = this.props;
    
    if ( loading ) return ( <CircularProgress /> );
    if ( error ) return `Error! ${error.message}`;

    return (
      <List
        {...rest}
        className={ clsx( classes.root, className )}
        aria-labelledby="nested-sidebar-menu"
        subheader={
          <ListSubheader component="div" id="nested-sidebar-menu">
            { this.props.location.pathname }
          </ListSubheader>
        }
      >
      {
        menus && menus.map(( options, idx )=>{
          const isLast = idx === menus.length - 1;
          
          return (
            <SideBarNavItem 
              { ...options }
              key={ options.title }
              isLast={ isLast }
            />
          )
        })
      }
      </List>
    );
  }
}

SidebarNav.propTypes = {
  className: PropTypes.string,
};

export default withStyles( styles, { withTheme: true })(
  graphql(
    GET_SIDE_BAR_MENUS, {
      fetchPolicy: "cache-and-network",
      props: ({ data: { loading, error, sideBarMenus }}) => ({
        loading,
        error,
        menus: sideBarMenus,
      }),
    }
  )( SidebarNav )
);