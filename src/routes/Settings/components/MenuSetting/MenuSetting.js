/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';
import { GridContainer, GridItem } from '@components/Grid';
const MenuSettingForm = React.lazy(()=>import('./components/MenuSettingForm'));

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
  leftPanel: {
    height: "100%",
  }
}));

/* Main Component */
const MenuSetting = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  return (
    <CircularSuspense>
      <GridContainer spacing={1}>
        <GridItem>          
          <Paper className={ classes.paper }>
            
          </Paper>        
        </GridItem>
        <GridItem>
          <Paper className={ classes.paper }>
            <MenuSettingForm />
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