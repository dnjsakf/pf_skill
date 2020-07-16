/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const SkillsETL = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <Container>
      SkillsETL
    </Container>
  );
}

/* Main Component Settings */
SkillsETL.propTypes = { }

/* Exports */
export default SkillsETL;