/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Custom Components */
import { CircularSuspense } from '@components/Suspense';

import TabBar from './components/TabBar';
import TabPanel from './components/TabPanel';

const MenuSetting = React.lazy(()=>( import('./components/MenuSetting') ));
const ThemeSetting = React.lazy(()=>( import('./components/ThemeSetting') ));

/* Styled Components */
const Container = styled.div`
  height: 100%;
`;

/* Main Component */
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: 0
    }
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event, newValue){
    this.setState(
      (state)=>(Object.assign(
        state,
        {
          value: newValue
        }
      ))
    );
  }

  render() {
    const {
      location,
      tabs,
      panels,
      ...rest
    } = this.props;
    
    const {
      value
    } = this.state;

    return (
      <Container>
        <TabBar
          tabs={ tabs }
          value={ value }
          onChange={ this.handleChange }
        />
        <CircularSuspense>
        {
          tabs && tabs.map(({ id }, index)=>{
            const Component = panels[id];
            
            return (
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
            )
          })
        }
        </CircularSuspense>
      </Container>
    );
  }
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