/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';

import TabBar from './components/TabBar';
import TabPanel from './components/TabPanel';

/* Styled Components */
const Container = styled.div`
  height: 100%;
`;

/* Main Component */
const TabMenus = props => {
  /* Props */
  const {
    tabs,
    panels,
    ...rest
  } = props;

  /* State */
  const [ value, setValue ] = useState(0);
  
  /* Handlers */
  const handleChange = useCallback(( event, newValue )=>{
    setValue( newValue );
  }, [ value ]);

  /* Renderer */
  return (
    <Container>
      <TabBar
        tabs={ tabs }
        value={ value }
        onChange={ handleChange }
      />
      <CircularSuspense>
      {
        tabs && tabs.map(({ id, component: Component }, index)=>(
          <TabPanel
            key={ id }
            selected={ index === value }
            id={ [id, "panel"].join("-") }
            aria-labelledby={ [id, "tab"].join("-") }
          >
          {
            Component 
            ? <Component /> 
            : "Not Found Tab Panel"
          }
          </TabPanel>
        ))
      }
      </CircularSuspense>
    </Container>
  );
}

/* Main Component Settings */
TabMenus.protoTypes = {
  tabs: PropTypes.array
}

/* Exports */
export default TabMenus;