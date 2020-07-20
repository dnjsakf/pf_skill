/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Custom Components */
import TabMenus from '@components/TabMenus';

/* Child Components */
const MenuSetting = React.lazy(()=>( import('./components/MenuSetting') ));
const ThemeSetting = React.lazy(()=>( import('./components/ThemeSetting') ));

/* Styled Components */
const Container = styled.div`
  height: 100%;
`;

/* Main Component */
const Settings = props => {
  /* Props */
  const {
    tabs,
    ...rest
  } = props;

  /* Renderer */
  return (
    <Container>
      <TabMenus tabs={ tabs } />
    </Container>
  );
}

/* Main Component Settings */
Settings.protoTypes = {
  tabs: PropTypes.array,
}

Settings.defaultProps = {
  tabs: [
    {
      id: "menu-settings",
      label: "메뉴설정",
      component: MenuSetting,
    },
    {
      id: "theme-settings",
      label: "테마설정",
      component: ThemeSetting,
    },
    {
      id: "auth-settings",
      label: "권한설정",
      component: MenuSetting,
    }
  ]
};

/* Exports */
export default Settings;