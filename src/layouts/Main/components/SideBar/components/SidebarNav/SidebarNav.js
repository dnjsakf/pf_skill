/* React */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { useHistory, useLocation } from 'react-router';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'reducers/menu/selectors';
import actions from 'reducers/menu/actions';

/* GraphQL */
import { useQuery } from "react-apollo";
import { GET_MENU_LIST } from '@graphql/menu/queries';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

/* Another Modules */
import clsx from 'clsx';

/* Custom Components */
import { CircularProgress } from '@components/Progress';
import { BaseTreeView } from '@components/TreeView';

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


/* Sub Component */
const Navigator = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Router Hook */
  const location = useLocation();
  
  /* Renderer */
  return (
    <div>
      <span>{ location.pathname }</span>
    </div>
  );
}

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
  const history = useHistory();
  const location = useLocation();

  /* Redux Hook */
  const dispatch = useDispatch();
  const selected = useSelector( selectors.getMenuForSideBar );
  
  /* Apollo Hook */
  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_MENU_LIST, {
      //fetchPolicy: "cache-and-network",
      onError(error){
        console.error( error );
      },
      onCompleted( completed ){
        console.log('[COMPLETED]', completed);
      }
    }
  );
  
  /* Handlers */
  const handleClick = useCallback( data => {
    history.push( data.href );
    
    dispatch( actions.selectOnSideBar( data ) );
  }, [ dispatch ]);
  
  /* Side Effects */
  useEffect(()=>{
    console.log( location.pathname, selected.href );
    
  }, [ location, history, selected ]);
  
  /* Renderer */
  if ( loading ) return ( <CircularProgress /> );
  if ( error ) return ( `Error! ${error.message}` );
  
  const { items } = data;
  
  return (
    <React.Fragment>
      <Navigator />
      <BaseTreeView
        items={ items }
        onClick={ handleClick }
        selected={ selected }
      />
    </React.Fragment>
  );  
}

/* Main Component Settings */
SideBarNav.propTypes = {
  className: PropTypes.string,
};

/* Exports */
export default SideBarNav;