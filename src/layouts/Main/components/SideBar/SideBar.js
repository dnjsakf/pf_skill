import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import { Profile, SidebarNav } from './components';

import clsx from 'clsx';

const styles = theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
});

const Container = styled.div`
  background-color: ${({ theme })=> theme.palette.white };
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme })=> theme.spacing(2) }px;
`;

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
      className,
      classes,
      theme,
      location,
      open,
      variant,
      onClose,
      ...rest
    } = this.props;
 
    return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={ onClose }
        open={ open }
        variant={ variant }
      >
        <Container theme={ theme }>
          <Profile />
          <Divider className={ classes.divider } />
          <SidebarNav location={ location } />        
        </Container>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
 
export default withStyles(styles, { withTheme: true })( SideBar );