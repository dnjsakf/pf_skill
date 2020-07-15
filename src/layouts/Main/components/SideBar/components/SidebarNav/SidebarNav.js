/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { compose } from 'redux';

/* Material-UI */
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

/* Custom Components */
import SideBarNavItem from './components/SideBarNavItem';
import CircularProgress from '@components/Progress/CircularProgress';

/* Another Modules */
import clsx from 'clsx';

/* Constants */
const styles = theme => ({
  root: {
  },
  sticky: {
    top: "unset",
  }
});

/* Main Component */
class SidebarNav extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { }
  }
  
  render(){
    const {
      classes,
      className,
      data,
      ...rest
    } = this.props;
    
    if ( loading ) return ( <CircularProgress /> );
    if ( error ) return `Error! ${error.message}`;
    
    const {
      loading,
      sideBarMenus,
      error,
    } = data;

    return (
      <List
        {...rest}
        className={ clsx( classes.root, className )}
        aria-labelledby="nested-sidebar-menu"
        subheader={
          <ListSubheader 
            component="div"
            id="nested-sidebar-menu"
            classes={{
              sticky: classes.sticky
            }}
          >
            <span>{ this.props.location.pathname }</span>
          </ListSubheader>
        }
      >
      {
        sideBarMenus && sideBarMenus.map(( options, idx )=>{
          const isLast = idx === sideBarMenus.length - 1;
          
          return (
            <SideBarNavItem 
              { ...options }
              key={ options.name }
              isLast={ isLast }
            />
          )
        })
      }
      </List>
    );
  }
}

/* Main Component Settings */
SidebarNav.propTypes = {
  className: PropTypes.string,
};

/* Exports */
export default compose(
  withStyles( styles, { withTheme: true })
)( SidebarNav );