import React, { Suspense } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import ErrorBoundary from './../../components/ErrorBoundary';
import CircularProgress from './../../components/Progress/CircularProgress';

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
  padding: 5px;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);

    const isDesktop = isWidthUp('lg', props.width);

    this.state = {
      isDesktop: isDesktop,
      isOpenSideBar: isDesktop ? true : false
    }

    this.handleOpenSideBar = this.handleOpenSideBar.bind( this );
    this.handleCloseSideBar = this.handleCloseSideBar.bind( this );
  }

  handleOpenSideBar(){
    this.setState((state)=>(Object.assign(state, { isOpenSideBar: true })));
  }

  handleCloseSideBar(){
    this.setState((state)=>(Object.assign(state, { isOpenSideBar: false })));
  }

  shouldComponentUpdate(nextProps, nextState){
    const isDesktop = isWidthUp('lg', nextProps.width);

    if( nextState.isDesktop !== isDesktop ){
      this.setState((state)=>(Object.assign(this.state, {
        isDesktop: isDesktop,
        isOpenSideBar: !!isDesktop
      })))
    }

    return true;
  }

  render() {
    const {
      isDesktop,
      isOpenSideBar
    } = this.state;

    const {
      classes,
      className,
      ...rest
    } = this.props;

    const shouldOpenSideBar = isDesktop ? true : isOpenSideBar;

    return (
      <ErrorBoundary>
        <Suspense fallback={ <CircularProgress /> }>
          <Container isDesktop={ isDesktop }>
            <ErrorBoundary>
              <Suspense fallback={ <CircularProgress />  }>
                <Header onOpenSideBar={ this.handleOpenSideBar }/>
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Suspense fallback={ <CircularProgress /> }>
                <SideBar
                  isDesktop={ isDesktop }
                  open={ shouldOpenSideBar }
                  onClose={ this.handleCloseSideBar }
                  variant={ isDesktop ? 'persistent' : 'temporary'}
                  location={ this.props.location }
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
 
export default withWidth()( Main );