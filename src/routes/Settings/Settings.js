import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabMenus = React.lazy(()=>(import('./components/TabMenus')));

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
      ...rest
    } = this.props;

    return (
      <Container>
        <TabMenus 
          id="setting-tab"
          ariaControls="setting-tab-panel"
          menus={ menus }
        >

        </TabMenus>
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
    },
    { 
      index: 1, 
      label: "테마설정"
    },
    { 
      index: 2, 
      label: "권한설정" 
    },
  ],
};
 
export default Settings;