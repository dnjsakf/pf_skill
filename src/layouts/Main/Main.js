import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import * as layoutSelector from 'reducers/layout/selectors';
import layoutAction from 'reducers/layout/actions';
import * as sidebarSelector from 'reducers/sidebar/selectors';
import sidebarAction from 'reducers/sidebar/actions';

import { isWidthUp } from '@material-ui/core/withWidth';

import ErrorBoundary from 'components/ErrorBoundary';
import CircularProgress from 'components/Progress/CircularProgress';

const Header = React.lazy(()=>import('./components/Header'));
const Footer = React.lazy(()=>import('./components/Footer'));
const SideBar = React.lazy(()=>import('./components/SideBar'));

const Container = styled.div`
  padding-top: 56px;
  height: 100%;

  @media (min-width: 600px) {
    padding-top: 64px;
  }

  ${({ isDesktop })=>{
    if( isDesktop ){
      return "padding-left: 240px;"
    }
  }}
`;

const Section = styled.main`
  height: 100%;
`;

const SectionWrapper = styled.div`
  height: 100%;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    const isDesktop = isWidthUp('lg', this.props.width);
    
    this.props.setIsDesktop( isDesktop );
    this.props.setIsOpenSideBar( isDesktop );
  }

  shouldComponentUpdate(nextProps, nextState){
    // When resized window.
    const isDesktop = isWidthUp('lg', nextProps.width);
    if( this.props.isDesktop !== nextProps.isDesktop || isDesktop !== this.props.isDesktop ) {
      this.props.setIsDesktop( isDesktop );
      this.props.setIsOpenSideBar( isDesktop );
      
      return true;
    }

    // Changed Page
    if( nextProps.location.pathname !== this.props.location.pathname ){
      return true;
    }
    
    return false;
  }

  render() {
    const {
      classes,
      location,
      className,
      isDesktop,
      isOpenSideBar,
      openSideBar,
      ...rest
    } = this.props;

    return (
      <ErrorBoundary>
        <Suspense fallback={ <CircularProgress /> }>
          <Container isDesktop={ isDesktop }>
            <ErrorBoundary>
              <Suspense fallback={ <CircularProgress />  }>
                <Header />
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Suspense fallback={ <CircularProgress /> }>
                <SideBar
                  location={ location }
                  variant={ isDesktop ? 'persistent' : 'temporary'}
                />
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Suspense fallback={ <CircularProgress />  }>
                <Section>
                  <SectionWrapper>
                    { this.props.children }
                  </SectionWrapper>
                </Section>
                <Footer />
              </Suspense>
            </ErrorBoundary>
            
          </Container>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

Main.propTypes = {
  isDesktop: PropTypes.bool,
  isOPenSideBar: PropTypes.bool,
  openSideBar: PropTypes.func,
}

const mapPropsToState = state => ({
  isDesktop: layoutSelector.getIsDesktop(state),
  isOpenSideBar: sidebarSelector.getIsOpen(state),
});

const mapDispatchToProps = dispatch => ({
  setIsDesktop( isDesktop ){
    dispatch( layoutAction.setIsDesktop( isDesktop ) )
  },
  setIsOpenSideBar( isOpen ){
    dispatch( sidebarAction.setIsOpen( isOpen ) );
  },
  openSideBar(){
    dispatch( sidebarAction.open() );
  },
});
 
export default connect( mapPropsToState, mapDispatchToProps )( Main );