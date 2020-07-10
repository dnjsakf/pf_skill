/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  height: 100%;
`;

/* Main Component */
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

/* Main Component Settings */
ThemeSetting.protoTypes = {
  
}

/* Exports */
export default ThemeSetting;