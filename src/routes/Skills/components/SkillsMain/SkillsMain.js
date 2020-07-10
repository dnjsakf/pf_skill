/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
class SkillsMain extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {  }
  }
  render() { 
    return ( 
      <Container>
        SkillsMain
      </Container>
    );
  }
}

/* Main Component Settings */
SkillsMain.propTypes = {
  
}

/* Exports */
export default SkillsMain;