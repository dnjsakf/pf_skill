import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CircularProgress from 'components/Progress/CircularProgress';

const MenuSetting = React.lazy(()=>( import('./routes/MenuSetting') ));
const ThemeSetting = React.lazy(()=>( import('./routes/ThemeSetting') ));
const TabMenus = React.lazy(()=>( import('./components/TabMenus')) );

const Container = styled.div`
  height: 100%;
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  }
  }

  render() { 
    const {
      menus,
      location,
      ...rest
    } = this.props;

    return (
      <Container>
        <Suspense fallback={ <CircularProgress /> }>
          <TabMenus
            id="setting-tab"
            ariaControls="setting-tab-panel"
            menus={ menus }
          />
        </Suspense>
      </Container>
    );
  }
}

Settings.protoTypes = {
  menus: PropTypes.array
}

Settings.defaultProps = {
  menus: [
    { 
      index: 0, 
      label: "메뉴설정",
      component: MenuSetting
    },
    { 
      index: 1, 
      label: "테마설정",
      component: ThemeSetting
    },
    { 
      index: 2, 
      label: "권한설정" ,
    },
  ],
};
 
export default Settings;