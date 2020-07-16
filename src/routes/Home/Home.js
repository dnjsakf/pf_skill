/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Home = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <Container>
      Section
    </Container>
  );
}

/* Main Component Settings */
Home.propTypes = {
}
 
/* Exports */
export default Home;