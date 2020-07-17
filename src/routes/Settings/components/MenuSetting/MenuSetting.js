/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'reducers/menu/selectors';
import actions from 'reducers/menu/actions';

/* Apollo */
import { useQuery } from 'react-apollo';
import { GET_MENU_LIST } from '@graphql/menu/queries';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

/* Another Modules */
import clsx from 'clsx';

/* Custom Components */
import { CircularProgress } from '@components/Progress';
import { CircularSuspense } from '@components/Suspense';
import { GridContainer, GridItem } from '@components/Grid';
import { BaseTreeView } from '@components/TreeView';

const MenuRegister = React.lazy(()=>import('./components/MenuRegister'));

/* Styled Components */
const Container = styled.div`
  width: 300px;
  height: 100%;
`;

/* Styles Hook */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/* Main Component */
const MenuSetting = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();

  /* Redux Hook */
  const dispatch = useDispatch();
  const selected = useSelector( selectors.getMenuForMenuSettings );
  
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
    dispatch( actions.selectOnMenuSettings( data ) );
  }, [ dispatch ]);
  
  /* Renderer */
  if ( loading ) return ( <CircularProgress /> );
  if ( error ) return ( `Error! ${error.message}` );
  
  const { items } = data;
  
  /* Renderer */
  return (
    <CircularSuspense>
      <GridContainer spacing={ 1 }>
        <GridItem sm={ 2 }>
          <Paper className={ 
            clsx({
              [classes.paper]: true,
            })
          }>
            <h5>메뉴 목록</h5>
            <BaseTreeView
              items={ items }
              selected={ selected }
              onClick={ handleClick }
            />
          </Paper>        
        </GridItem>
        <GridItem>
          <Paper className={ 
            clsx({
              [classes.paper]: true,
            })
          }>
            <MenuRegister 
              selected={ selected }
            />
          </Paper>
        </GridItem>
      </GridContainer>
    </CircularSuspense>
  );
}

/* Main Component Settings */
MenuSetting.protoTypes = {
}

/* Exports */
export default MenuSetting;