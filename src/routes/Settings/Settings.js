import React, { Component } from 'react';
import styled from 'styled-components';

const TabMenus = React.lazy(()=>(import('./components/TabMenus')));

const SettingsBox = styled.div`
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <SettingsBox>
        <TabMenus />
      </SettingsBox>
    );
  }
}
 
export default Settings;