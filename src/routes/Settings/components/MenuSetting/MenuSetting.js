/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Apollo */
import { useQuery } from 'react-apollo';
import { GET_SIDE_BAR_MENUS } from '@graphql/SideBar/queries';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';
import { GridContainer, GridItem } from '@components/Grid';

/* Another Components */
import clsx from 'clsx';

const MenuRegister = React.lazy(()=>import('./components/MenuRegister'));
const MenuTreeView = React.lazy(()=>import('./components/MenuTreeView'));

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
  
  /* Apollo Hook */
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
            <MenuTreeView items={ sideBarMenus } />
          </Paper>        
        </GridItem>
        <GridItem>
          <Paper className={ 
            clsx({
              [classes.paper]: true,
            })
          }>
            <MenuRegister />
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