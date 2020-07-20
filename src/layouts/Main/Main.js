/* React */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { useLocation } from 'react-router';

/* Redux */
import { useDispatch } from 'react-redux';
import * as layoutSelector from '@reducers/layout/selectors';
import layoutAction from '@reducers/layout/actions';
import * as sideBarSelector from '@reducers/sidebar/selectors';
import sideBarAction from '@reducers/sidebar/actions';

/* Material-UI */
import { isWidthUp } from '@material-ui/core/withWidth';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

/* Another Modules */
import clsx from 'clsx';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';

/* Child Components */
const Header = React.lazy(()=>import('./components/Header'));
const Footer = React.lazy(()=>import('./components/Footer'));
const SideBar = React.lazy(()=>import('./components/SideBar'));

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  main: {
    height: "100%",
  },
  wrapper: {
    height: "100%",
  }
}));

/* Main Compoent */
const Main = props => {
  /* Props */
  const {
    className,
    children,
    ...rest
  } = props;
  
  /* Styles Hooke */
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  
  /* Router Hook */
  const location = useLocation();
  
  /* Redux Hook */
  const dispatch = useDispatch();
  
  /* Side Effects */
  useEffect(()=>{
    dispatch( layoutAction.setIsDesktop( isDesktop ) );
    dispatch( sideBarAction.setIsOpen( isDesktop ) );
  }, [ dispatch, isDesktop ]);
  
  useEffect(()=>{    
    document.scrollingElement.scrollTop = 0;
  }, [ location ]);
  
  /* Renderer */
  return (
    <CircularSuspense>
      <div 
        className={
          clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          }, 
          className)                 
        }
      >
        <CircularSuspense>
          <Header />
        </CircularSuspense>
        
        <CircularSuspense>
          <SideBar 
            variant={
              isDesktop 
              ? 'persistent' 
              : 'temporary'
            }
          />
        </CircularSuspense>
        
        <CircularSuspense>
          <main className={ classes.main }>
            <div className={ classes.wrapper }>
              { children }
            </div>
          </main>
          <Footer />
        </CircularSuspense>
        
      </div>
    </CircularSuspense>
  );
}

/* Main Component Settings */
Main.propTypes = {
  isDesktop: PropTypes.bool,
  children: PropTypes.node,
}

/* Exports */
export default Main;