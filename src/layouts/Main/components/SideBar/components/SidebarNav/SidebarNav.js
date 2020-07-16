/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { useLocation } from 'react-router';

/* GraphQL */
import { useQuery } from "react-apollo";
import { GET_SIDE_BAR_MENUS } from '@graphql/SideBar/queries';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

/* Custom Components */
import CircularProgress from '@components/Progress/CircularProgress';
import SideBarNavItem from './components/SideBarNavItem';

/* Another Modules */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
  },
  sticky: {
    top: "unset",
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
}));

/* Main Component */
const SideBarNav = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;
  
  /* Hooks */
  /* Styles Hook */
  const classes = useStyles();
  
  /* Router Hook */
  const location = useLocation();
  
  /* GraphQL Hook */
  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_SIDE_BAR_MENUS, {
      //fetchPolicy: "cache-and-network",
      onError(error){
        console.error( error );
      },
      onCompleted( completed ){
        console.log('[COMPLETED]', completed);
      }
    }
  );
  
  /* Renderer */
  if ( loading ) return ( <CircularProgress /> );
  if ( error ) return ( `Error! ${error.message}` );
  
  const { sideBarMenus } = data;
  
  return (
    <List
      {...rest}
      className={ clsx( classes.root, className )}
      aria-labelledby="nested-sidebar-menu"
      subheader={
        <ListSubheader 
          component="div"
          id="nested-sidebar-menu"
          classes={{
            sticky: classes.sticky
          }}
        >
          <span>{ location.pathname }</span>
        </ListSubheader>
      }
    >
    {
      sideBarMenus && sideBarMenus.map(( info, idx )=>{
        return (
          <React.Fragment key={ info.name }>
            <SideBarNavItem { ...info } />          
            <Divider className={ classes.divider }/>
          </React.Fragment>
        )
      })
    }
    </List>
  );  
}

/* Main Component Settings */
SideBarNav.propTypes = {
  className: PropTypes.string,
};

/* Exports */
export default SideBarNav;