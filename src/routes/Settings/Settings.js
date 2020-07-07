import React from 'react';
import styled from 'styled-components';

const TabMenus = React.lazy(()=>(import('./components/TabMenus')));

const Container = styled.div`
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Container>
        <TabMenus />
      </Container>
    );
  }
}
 
export default Settings;