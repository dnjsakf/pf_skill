import React, { Component, Suspense, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    color: blueGrey[800],
    padding: '10px 8px',
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
  }
});

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

function loadIcon( name ){
  switch( name ){
    case "Image":
      return ImageIcon;
      break;
    case "Setting":
      return SettingsIcon;
      break;
    default:
      return null;
  }
}

class SidebarNav extends Component {
  constructor(props){
    super(props);
    
    this.state = {}
  }
  
  render(){
    const {
      className,
      classes,
      loading,
      error,
      data,
      ...rest
    } = this.props;
    
    if ( loading ) return ( <h3>SideBar Loadding...</h3> );
    if ( error ) return `Error! ${error.message}`;
    
    return (
      <List
        {...rest}
        className={ clsx( classes.root, className )}
      >
      {
        data && data.map(({ title, href, icon })=>{
          const Icon = loadIcon(icon);
          
          return (
            <ListItem
              key={ title }
              className={classes.item}
              disableGutters
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
          );
        })
      }
      </List>
    );
  }
}

SidebarNav.propTypes = {
  className: PropTypes.string,
};

export default withStyles(styles)(SidebarNav);