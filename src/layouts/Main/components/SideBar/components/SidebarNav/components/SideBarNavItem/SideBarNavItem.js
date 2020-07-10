/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { NavLink as RouterLink } from 'react-router-dom';

/* Material-UI */
import { makeStyles, withStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Code from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/* Another Modules */
import clsx from 'clsx';

/* Constants */
const loadIcon = name => {
  switch( name ){
    case "Image":
      return ImageIcon;
    case "Settings":
      return SettingsIcon;
    case "Dashboard":
      return DashboardIcon;
    case "Code":
      return Code;
    default:
      return null;
  }
}

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
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
}));

/* Sub Components */
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SideBarSubNavItem = ( props )=>{
  const classes = useStyles();
  const {
    className,
    title,
    href,
    icon,
    isLast,
    ...rest
  } = props;
  
  const Icon = loadIcon( icon );
  
  return (
    <>
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
          {
            Icon && (
              <div className={ classes.icon }>
                <Icon />
              </div>
            )
          }
          { title }
        </Button>
      </ListItem>
      { !isLast && <Divider className={ classes.divider }/> }
    </>
  );
}

const SideBarSubNav = ( props )=>{
  const classes = useStyles();
  const {
    className,
    history,
    open,
    menus,
    ...rest
  } = props;
  
  if( !menus ){ return null; }

  return (
    <Collapse 
      in={ open } 
      timeout="auto"
    >
      <List component="div" disablePadding>
      {
        menus && menus.map(( options, idx )=>{
          const isFirst = idx === 0;
          const isLast = idx === menus.length - 1;
          
          return (
            <SideBarSubNavItem 
              { ...options }
              key={ options.title }
              isFirst={ isFirst }
              isLast={ isLast }
            />
          );
        })
      }
      </List>
    </Collapse>
  );
}

/* Main Component */
const SideBarNavItem = ( props )=>{
  const classes = useStyles();
  const {
    className,
    title,
    href,
    icon,
    subMenus,
    ...rest
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Icon = loadIcon( icon );
  const hasSubMenus = subMenus && subMenus.length > 0;
  
  return (
    <>
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
          {
            Icon && (
              <div className={ classes.icon }>
                <Icon />
              </div>
            )
          }
          { title }
        </Button>
        { hasSubMenus && ( open ? <ExpandLess /> : <ExpandMore /> ) }
      </ListItem>
      <SideBarSubNav open={ open } menus={ subMenus } />
      <Divider className={ classes.divider }/>
    </>
  );
}

/* Main Component Settings */
SideBarNavItem.propTypes = {
  className: PropTypes.string,
};

/* Exports */
export default SideBarNavItem;