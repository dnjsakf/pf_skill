/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

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

/* Child Components */
const MenuRegister = React.lazy(()=>import('./components/MenuRegister'));

/* Styled Components */
const Container = styled.div`
  width: 300px;
  height: 100%;
`;

/* Styles Hook */
const useStyles = makeStyles( theme => ({
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
  
  /* State */
  const [ selected, setSelected ] = useState( null );
  const [ regMode, setRegMode ] = useState( selected ? "update" : "create" );
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Apollo Hook: Query */
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
  const handleClick = useCallback( item => {
    setSelected( item );
  }, [ ]);
  
  /* Side Effects */
  useEffect(()=>{
    setRegMode( selected ? "update" : "create" );
  }, [ selected ]);
  
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
              mode={ regMode }
              defaultValue={ selected }
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