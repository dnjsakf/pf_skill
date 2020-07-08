import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      ariaControls,
      menus,
      value,
      onChange,
      ...rest
    } = this.props;

    return ( 
      <AppBar position="static" color="default">
        <Tabs
          value={ value }
          onChange={ onChange }
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
        {
          menus && menus.map(({ index, label })=>(
            <Tab
              key={ id+index } 
              id={ id }
              label={ label } 
              aria-controls={ ariaControls }
            />
          ))
        }
        </Tabs>
      </AppBar>
    );
  }
}

TabBar.propTypes = {
  value: PropTypes.any,
  menus: PropTypes.array,
}
 
export default TabBar;