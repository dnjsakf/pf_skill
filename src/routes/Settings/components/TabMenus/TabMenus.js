import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from "theme";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabBar from './components/TabBar';
import TabPanel from './components/TabPanel';

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme })=>( theme.palette.background.paper )};
`;

class TabMenus extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue){
    this.setState((state)=>Object.assign(state, {
      value: newValue
    }));
  }

  render() {
    const {
      id,
      ariaControls,
      menus,
      ...rest
    } = this.props;

    const { value } = this.state;

    return ( 
      <Container theme={ theme }>
        <TabBar
          id={ id }
          ariaControls={ ariaControls }
          menus={ menus }
          value={ value }
          onChange={ this.handleChange }
        />
        {
          menus && menus.map(({ index, label, component: Component })=>{
            return (
              <TabPanel key={ id+index } id={ ariaControls } index={ index } value={ value }>
                { Component && <Component /> }
              </TabPanel>
            );
          })
        }
      </Container>
    );
  }
}
 
export default TabMenus;