import React, { Component } from 'react';
import styled from 'styled-components';

const Counter = React.lazy(()=>import('./components/Counter'));

const HomeBox = styled.div`
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <HomeBox>
        Section
        <Counter>
          Count
        </Counter>
      </HomeBox>
    );
  }
}
 
export default Home;