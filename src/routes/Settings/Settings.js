/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Custom Components */
import TabMenus from '@components/TabMenus';

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
    panels,
    ...rest
  } = props;

  /* Renderer */
  return (
    <Container>
      <TabMenus 
        tabs={ tabs }
        panels={ panels }
      />
    </Container>
  );
}

/* Main Component Settings */
Settings.protoTypes = {
  tabs: PropTypes.array,
  panels: PropTypes.array
}

Settings.defaultProps = {
  tabs: [
    {
      id: "menu-settings",
      label: "메뉴설정",
    },
    {
      id: "theme-settings",
      label: "테마설정",
    },
    {
      id: "auth-settings",
      label: "권한설정",
    }
  ],
  panels: {
    "menu-settings": MenuSetting,
    "theme-settings": ThemeSetting,
    "auth-settings": MenuSetting,
  }
};

/* Exports */
export default Settings;