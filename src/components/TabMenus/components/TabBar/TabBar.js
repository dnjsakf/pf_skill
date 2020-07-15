/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { useRouteMatch, NavLink as RouterLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Custom Theme */
import theme from '@theme';

/* Styled Components */
const Container = styled.div`
  backgroun-color: ${({ theme })=>( theme.palette.background.paper )};
`;

/* Custom Components */
import { CustomTabs, CustomTab } from './components'

/* Sub Components */
const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ ref }>
    <RouterLink {...props} />
  </div>
));

/* Main Component */
const TabBar = props => {
  /* Props */
  const {
    tabs,
    value,
    onChange,
    ...rest
  } = props;

  /* Hooks */
  const { path } = useRouteMatch();

  /* Renderer */
  return (
    <Container theme={ theme }>
      <CustomTabs
        value={ value }
        onChange={ onChange }
        variant="scrollable"
        scrollButtons="auto"
        aria-label="settings tabs"
      >
      {
        tabs && tabs.map(({ id, label })=>(
          <CustomTab
            key={ id }
            id={ [id, "tab"].join("-") }
            label={ label }
            aria-controls={ [id, "panel"].join("-") }
            component={
              CustomRouterLink
            }
            to={ [path, id].join("/") }
            { ...rest }
          />
        ))
      }
      </CustomTabs>
    </Container>
  );
}

/* Main Component Settings */
TabBar.propTypes = {
  tabs: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

/* Exports */
export default TabBar;