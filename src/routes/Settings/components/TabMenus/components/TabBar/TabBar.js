import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import theme from 'theme';

const Container = styled.div`
  backgroun-color: ${({ theme })=>( theme.palette.background.paper )};
`;

const CustomTabs = withStyles((theme)=>({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
}))( props => <Tabs {...props} /> );

const CustomTab = withStyles((theme)=>({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))( props => <Tab disableRipple {...props} /> );

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
      <Container theme={ theme }>
        <CustomTabs
          value={ value }
          onChange={ onChange }
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
        {
          menus && menus.map(({ index, label })=>(
            <CustomTab
              key={ id+index } 
              id={ id }
              label={ label } 
              aria-controls={ ariaControls }
            />
          ))
        }
        </CustomTabs>
      </Container>
    );
  }
}

TabBar.propTypes = {
  value: PropTypes.any,
  menus: PropTypes.array,
}
 
export default TabBar;