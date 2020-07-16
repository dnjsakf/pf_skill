/* React */
import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink as RouterLink } from 'react-router-dom';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/* Custom Components */
import { MappedIcon } from '@components/Icon';

/* Another Modules */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    color: blueGrey[800],
    padding: '5px 2px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.error.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
}));

/* Sub Component */
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

/* Sub Component */
const ExpandIcon = ({ isExpand, open }) => (
  isExpand && (
    open 
    ? <ExpandLess /> 
    : <ExpandMore /> 
  )
)

/* Sub Component */
const SideBarSubNavItem = props =>{
  /* Props */
  const {
    className,
    name,
    href,
    icon,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  return (
    <React.Fragment>
      <ListItem
        className={
          clsx({
            [classes.item]: true,
            [classes.nested]: true
          }, className)
        }
      >
        <Button
          activeClassName={ classes.active }
          className={ classes.button }
          component={ CustomRouterLink }
          to={ href }
        >
          <MappedIcon 
            name={ icon }
            className={ classes.icon }
          />
          { name }
        </Button>
      </ListItem>
    </React.Fragment>
  );
}

/* Sub Component */
const SideBarSubNav = props => {
  /* Props */
  const {
    className,
    history,
    open,
    menus,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  if( !menus ){ return null; }

  return (
    <List
      component="div"
      disablePadding
    >
    {
      menus && menus.map(( options, idx )=>{
        const isFirst = idx === 0;
        const isLast = idx === menus.length - 1;
        
        return (
          <React.Fragment key={ options.name }>
            <SideBarSubNavItem { ...options } />
            { !isLast && <Divider className={ classes.divider }/> }
          </React.Fragment>
        );
      })
    }
    </List>
  );
}

/* Main Component */
const SideBarNavItem = props => {
  /* Props */
  const {
    className,
    name,
    href,
    icon,
    subMenus,
    ...rest
  } = props;
  
  const isExpand = subMenus && subMenus.length > 0;

  /* State */
  const [open, setOpen] = useState( false );

  /* Hooks */
  const classes = useStyles();
  
  /* Handlers */
  const handleClick = useCallback( event => {
    setOpen(!open);
  }, [ open ]);
  
  /* Side Effects */
  useEffect(()=>{
    //console.log( open );
  }, [ open ]);
  
  /* Renderer */
  return (
    <React.Fragment>
      <ListItem
        className={ classes.item }
        disableGutters
      >
        <Button
          activeClassName={ classes.active }
          className={ classes.button }
          component={ CustomRouterLink }
          to={ href }
          onClick={ handleClick }
        >
          <MappedIcon 
            name={ icon }
            className={ classes.icon }
          />
          { name }
        </Button>
        <ExpandIcon
          isExpand={ isExpand }
          open={ open }
        />
      </ListItem>
      {
        isExpand && (
          <Collapse 
            in={ open } 
            timeout="auto"
          >
            <SideBarSubNav
              open={ open }
              menus={ subMenus }
            />
          </Collapse>
        )
      }
    </React.Fragment>
  );
}

/* Main Component Settings */
SideBarNavItem.propTypes = {
  className: PropTypes.string,
};

/* Exports */
export default SideBarNavItem;