/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* Custom Theme */
import theme from '@theme';

/* Styled Components */
const Container = styled.div`
  backgroun-color: ${({ theme })=>( theme.palette.background.paper )};
`;

/* Sub Components */
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

/* Main Component */
class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      tabs,
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
          aria-label="settings tabs"
        >
        {
          tabs && tabs.map(({ id, label }, index)=>(
            <CustomTab
              key={ id }
              id={ [id, "tab"].join("-") }
              label={ label }
              aria-controls={ [id, "panel"].join("-") }
              { ...rest }
            />
          ))
        }
        </CustomTabs>
      </Container>
    );
  }
}

/* Main Component Settings */
TabBar.propTypes = {
  tabs: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

/* Exports */
export default TabBar;