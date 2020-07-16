/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const SkillsELK = props => {
  /* Props */
  const {
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <Container>
      SkillsELK
    </Container>
  );
}

/* Main Component Settings */
SkillsELK.propTypes = { }

/* Exports */
export default SkillsELK;