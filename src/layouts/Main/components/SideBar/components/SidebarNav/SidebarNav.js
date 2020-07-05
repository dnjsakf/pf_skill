import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { Query } from "react-apollo";
import QUERY from './../../../../../../graphql/queries';

/* Materialize Styles */
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
}));

/* Component */
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

/* Component */
const SidebarNav = ( props )=>{
  /* Props */
  const classes = useStyles();
  const {
    className,
    ...rest
  } = props;
  
  /* Rendering */
  return (
    <List
      {...rest}
      className={ clsx(classes.root, className )}
    >
      <Query query={QUERY.GET_SIDE_BAR_MENUS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return data.sidebarMenus.map(({ title, href, icon })=> (
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
                  icon && (
                    <div className={ classes.icon }>
                      {/* <Icon /> */}
                    </div>
                  )
                }
                { title }
              </Button>
            </ListItem>
          ));
        }}
      </Query>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
};

export default SidebarNav;