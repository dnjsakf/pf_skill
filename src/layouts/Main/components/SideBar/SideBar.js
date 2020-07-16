/* React */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { getIsOpen } from '@reducers/sidebar/selectors';
import sidebarAction from '@reducers/sidebar/actions';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider'; 
import Drawer from '@material-ui/core/Drawer';

/* Custom Components */
import { Profile, SidebarNav } from './components';

/* Another Components */
import MyTheme from "@theme";

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

/* Styled Components */
const Container = styled.div`
  background-color: ${({ theme })=> theme.palette.white };
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme })=> theme.spacing(2) }px;
`;

/* Main Component */
const SideBar = props => {
  /* Props */
  const {
    className,
    variant,
    ...rest
  } = props;
  
  /* Hooks */
  const classes = useStyles();

  /* Redux Hooks */
  const dispatch = useDispatch()
  const isOpen = useSelector( getIsOpen );
  
  /* Dispatchers */
  const handleClose = useCallback(()=>{
    dispatch( sidebarAction.close() )
  }, [ dispatch ]);
  
  /* Renderer */
  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawer
      }}
      onClose={ handleClose }
      open={ isOpen }
      variant={ variant }
    >
      <Container theme={ MyTheme }>
        <Profile />
        <Divider className={ classes.divider } />
        <SidebarNav />
      </Container>
    </Drawer>
  );
}

/* Main Component Settings */
SideBar.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
}

/* Exports */
export default SideBar;