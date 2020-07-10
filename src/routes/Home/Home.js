/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {  }
  }
  render() { 
    return ( 
      <Container>
        Section
      </Container>
    );
  }
}

/* Main Component Settings */
Home.propTypes = {
  
}
 
/* Exports */
export default Home;