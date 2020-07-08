import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabBar from './components/TabBar';
import TabPanel from './components/TabPanel';

const styles = theme => ({
  root: {
    position: "relative",
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



class TabMenus extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue){
    this.setState((state)=>Object.assign(state, {
      value: newValue
    }));
  }

  render() {
    const {
      classes,
      id,
      ariaControls,
      menus,
      ...rest
    } = this.props;

    const { value } = this.state;

    return ( 
      <div className={ classes.root }>
        <TabBar
          id={ id }
          ariaControls={ ariaControls }
          menus={ menus }
          value={ value }
          onChange={ this.handleChange }
        />
        {
          menus && menus.map(({ index, label })=>(
            <TabPanel key={ id+index } value={ value } index={ index }>
              { label }
            </TabPanel>
          ))
        }
      </div>
    );
  }
}
 
export default withStyles(styles)(TabMenus);