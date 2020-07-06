import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme)=>({
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
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const loadIcon = name => {
  switch( name ){
    case "Image":
      return ImageIcon;
    case "Settings":
      return SettingsIcon;
    case "Dashboard":
      return DashboardIcon;
    default:
      return null;
  }
}

const SideBarNavItem = ( props )=>{
  const {
    className,
    title,
    href,
    icon,
    subMenus,
    ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Icon = loadIcon( icon );
  
  return (
    <>
      <ListItem
        className={ classes.item }
        disableGutters
      >
        <Button
          className={ classes.button }
          onClick={ handleClick }
          selected={ open }
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
      {
        subMenus && (
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
              subMenus.map(({title: sub_title, href: sub_href, icon: sub_icon})=>{
                const SubIcon = loadIcon( icon );
                
                return (
                  <ListItem
                    key={ sub_title }
                    className={ classes.nested }
                  >
                    <Button
                      activeClassName={ classes.active }
                      className={ classes.button }
                      component={ CustomRouterLink }
                      to={ sub_href }
                    >
                      {
                        SubIcon && (
                          <div className={ classes.icon }>
                            <SubIcon />
                          </div>
                        )
                      }
                      { sub_title }
                    </Button>
                  </ListItem>
                );
              })
            }
            </List>
          </Collapse>
        )
      }
    </>
  );
}

SideBarNavItem.propTypes = {
  className: PropTypes.string,
};

export default SideBarNavItem;