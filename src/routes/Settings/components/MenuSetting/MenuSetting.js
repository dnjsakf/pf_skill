/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import { CircularSuspense } from '@components/Suspense';
const MenuSettingForm = React.lazy(()=>import('./components/MenuSettingForm'));

/* Styled Components */
const Container = styled.div`
  width: 300px;
  height: 100%;
`;

/* Main Component */
class MenuSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  }
  }

  render() { 
    const {
      ...rest
    } = this.props;

    return (
      <CircularSuspense>
        <Container>
          <MenuSettingForm />
        </Container>
      </CircularSuspense>
    );
  }
}

/* Main Component Settings */
MenuSetting.protoTypes = {
  
}

/* Exports */
export default MenuSetting;