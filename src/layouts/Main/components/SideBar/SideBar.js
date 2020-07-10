/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as sidebarSelector from '@reducers/sidebar/selectors';
import sidebarAction from '@reducers/sidebar/actions';

/* GraphQL */
import { graphql } from "react-apollo";
import { GET_SIDE_BAR_MENUS } from '@graphql/SideBar/queries';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider'; 
import Drawer from '@material-ui/core/Drawer';

/* Custom Components */
import { Profile, SidebarNav } from './components';

/* Constants */
const styles = theme => ({
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
});

/* Sub Components */
const Container = styled.div`
  background-color: ${({ theme })=> theme.palette.white };
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme })=> theme.spacing(2) }px;
`;

/* GraphQL HOC */
const SidebarNavWithQuery = graphql(
  GET_SIDE_BAR_MENUS, {
    fetchPolicy: "cache-and-network",
    //props: ({ data: { loading, error, sideBarMenus }}) => ({
    //  loading,
    //  error,
    //  menus: sideBarMenus,
    //}),
  }
)( SidebarNav );

/* Main Component */
class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }
  
  render() {
    const {
      classes,
      theme,
      location,
      className,
      variant,
      isOpen,
      onClose,
      ...rest
    } = this.props;
 
    return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={ onClose }
        open={ isOpen }
        variant={ variant }
      >
        <Container theme={ theme }>
          <Profile />
          <Divider className={ classes.divider } />
          <SidebarNavWithQuery location={ location } />
        </Container>
      </Drawer>
    );
  }
}

/* Main Component Settings */
SideBar.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

/* Mapping to props */
const mapStateToProps = state => ({
  isOpen: sidebarSelector.getIsOpen(state),
});
const mapDispatchToProps = dispatch => ({
  onClose(){
    dispatch( sidebarAction.close() );
  },
});
 
/* Exports */
export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  withStyles(styles, { withTheme: true })
)( SideBar );