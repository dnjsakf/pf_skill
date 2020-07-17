/* React */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles, useTheme } from '@material-ui/styles';
import { blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/* Another Modules */
import clsx from 'clsx';

/* Custom Components */
import { MappedIcon } from '@components/Icon';

/* Styles Hook */
const useStyles = makeStyles((theme)=>({
  root: {
    width: "100%",
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    color: blueGrey[800],
    padding: '5px 2px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.error.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  divider: {
    margin: "2px 0",
  }
}));

/* Sub Component */
const ExpandIcon = ({ isExpand, open }) => (
  isExpand
  ? (
      open 
      ? <ExpandLess /> 
      : <ExpandMore /> 
    )
  : null
)

/* Sub Component */
const BaseTreeItem = props => {
  /* Props */
  const {
    item,
    depth,
    selected,
    onClick,
    ...rest
  } = props;

  /* State */
  const [open, setOpen] = useState( false );
  
  /* Styles Hook */
  const classes = useStyles();
  const theme = useTheme();
  
  /* Handlers */
  const handleClick = useCallback( event => {
    event.preventDefault();
    
    setOpen(!open);
    
    onClick && onClick( item );
  }, [ open ]);

  /* Renderer */
  const isExpand = item.subItems && item.subItems.length > 0;
  const active = selected && ( selected.id === item.id );

  return (
    <React.Fragment>
      <ListItem
        disableGutters
        className={
          clsx({
            [classes.item]: true,
          })          
        }
        style={{
          paddingLeft: theme.spacing((depth-1)*2)
        }}
      >
        <Button
          className={ 
            clsx({
              [classes.button]: true,
              [classes.active]: active,
            })
          }
          onClick={ handleClick }
        >
          <MappedIcon 
            name={ item.icon }
            className={ classes.icon }
          />
          { item.label }
        </Button>
        <ExpandIcon isExpand={ isExpand } open={ open } />
      </ListItem>
      <Divider className={ classes.divider } />
      { 
        isExpand && (
          <Collapse in={ open } timeout="auto" >
            <BaseTreeView
              items={ item.subItems }
              depth={ depth+1 }
              selected={ selected }
              onClick={ onClick }
            />
          </Collapse>
        )
      }
    </React.Fragment>
  )
}

/* Main Component */
const BaseTreeView = props => {
  /* Props */
  const {
    items,
    depth,
    selected,
    onClick,
    ...rest
  } = props;
  
  /* Renderer */
  return (
    <List
      component="div"
      disablePadding
    >
      {
        items && items.map(( item, index )=>(
          <BaseTreeItem 
            key={ item.id }
            item={ item }
            depth={ depth }
            selected={ selected }
            onClick={ onClick }
          />
        ))
      }
    </List>
  );
}

/* Main Component Settings */
BaseTreeView.propTypes = {
  items: PropTypes.array.isRequired,
  depth: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.any,
};
BaseTreeView.defaultProps = {
  depth: 1,
};

/* Exports */
export default BaseTreeView;