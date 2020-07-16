/* React */
import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
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
  active: {
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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

const MenuTreeItem = props => {
  /* Props */
  const {
    item,
    depth,
    ...rest
  } = props;
  
  const isExpand = item.subMenus && item.subMenus.length > 0;

  /* State */
  const [open, setOpen] = useState( false );
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Handlers */
  const handleClick = useCallback( event => {
    setOpen(!open);
  }, [ open ]);
  
  return (
    <React.Fragment>
      <ListItem
        disableGutters
        className={
          clsx({
            [classes.item]: true,
            [classes.nested]: depth > 1,
          })          
        }
      >
        <Button
          className={ classes.button }
          onClick={ handleClick }
        >
          { item.name }
        </Button>
        <ExpandIcon isExpand={ isExpand } open={ open } />
      </ListItem>
      { 
        isExpand && (
          <Collapse in={ open } timeout="auto" >
            <MenuTreeView
              items={ item.subMenus }
              depth={ depth+1 }
            />
          </Collapse>
        )
      }
    </React.Fragment>
  )
}


const MenuTreeView = props => {
  /* Props */
  const {
    items,
    depth,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  return (
    <List
      component="div"
      disablePadding
    >
      {
        items && items.map(( item, index )=>(
          <MenuTreeItem 
            key={ item.group+item.name+index } 
            item={ item } 
            classes={ classes }
            depth={ depth }
          />
        ))
      }
    </List>
  );
}

/* Main Component Settings */
MenuTreeView.propTypes = {
  items: PropTypes.any,
  depth: PropTypes.any,
};
MenuTreeView.defaultProps = {
  depth: 1,
};

/* Exports */
export default MenuTreeView;