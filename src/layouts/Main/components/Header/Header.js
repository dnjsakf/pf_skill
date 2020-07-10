/* React */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';
import sidebarAction from '@reducers/sidebar/actions';

/* Material-UI */
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

/* Another Modules */
import clsx from 'clsx';

/* Constants */
const styles = theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
});

/* Main Component */
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    }
  }

  render() { 
    const {
      theme,
      classes,
      className,
      openSideBar,
      ...rest
    } = this.props;

    return  (
      <AppBar
        {...rest}
        className={ clsx( classes.root, className ) }
      >
        <Toolbar>
          <RouterLink to="/home">
            <img
              alt="Logo"
              src="/public/images/logos/Pokemon.png"
              height="50px"
            />
          </RouterLink>
          <div className={ classes.flexGrow } />
          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={ this.state.notifications.length }
                color="error"
                variant="standard"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={ classes.signOutButton }
              color="inherit"
            >
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={ openSideBar }
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

/* Main Component Settings */
Header.propTypes = {
  className: PropTypes.string,
  openSideBar: PropTypes.func.isRequired,
}

/* Mapping to props */
const mapDispatchToProps = dispatch => ({
  openSideBar() {
    dispatch( sidebarAction.open() );
  },
});

/* Exports */
export default compose(
  withStyles(styles, { withTheme: true }),
  connect( null, mapDispatchToProps )
)( Header );