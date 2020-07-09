import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
  height: 100%;
`;

class ThemeSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  }
  }

  render() { 
    const {
      ...rest
    } = this.props;

    return (
      <Container>
        <span>ThemeSetting</span>
      </Container>
    );
  }
}

ThemeSetting.protoTypes = {
  
}
 
export default ThemeSetting;