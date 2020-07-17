/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import * as layoutSelector from '@reducers/layout/selectors';
import layoutAction from '@reducers/layout/actions';
import * as sidebarSelector from '@reducers/sidebar/selectors';
import sidebarAction from '@reducers/sidebar/actions';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { isWidthUp } from '@material-ui/core/withWidth';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';

const Header = React.lazy(()=>import('./components/Header'));
const Footer = React.lazy(()=>import('./components/Footer'));
const SideBar = React.lazy(()=>import('./components/SideBar'));

/* Styled Components */
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


/* Main Compoent */
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
  
  componentDidUpdate(){
    document.scrollingElement.scrollTop = 0;
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
      <CircularSuspense>
        <Container isDesktop={ isDesktop }>
          <CircularSuspense>
            <Header />
          </CircularSuspense>
          
          <CircularSuspense>
            <SideBar
              location={ location }
              variant={ isDesktop ? 'persistent' : 'temporary'}
            />
          </CircularSuspense>
          
          <CircularSuspense>
            <Section>
              <SectionWrapper>
                { this.props.children }
              </SectionWrapper>
            </Section>
            <Footer />
          </CircularSuspense>
          
        </Container>
      </CircularSuspense>
    );
  }
}

/* Main Component Settings */
Main.propTypes = {
  isDesktop: PropTypes.bool,
  isOPenSideBar: PropTypes.bool,
  openSideBar: PropTypes.func,
}

/* Mapping to props */
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

/* Exports */
export default connect( mapPropsToState, mapDispatchToProps )( Main );