/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  input: {
    padding: theme.spacing(1, 1)
  },
  label: {
    marginRight: 10
  },
  labelPlacementStart: {
    margin: 'unset'
  }
}));

/* Main Component */
const InputWithLabel = props => {
  /* Props */
  const {
    label,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  return (
    <FormControlLabel
      label={ label }
      control={
        <TextField
          { ...rest }
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
      }
      labelPlacement="start"
      classes={{
        label: classes.label,
        labelPlacementStart: classes.labelPlacementStart
      }}
    />
  );
}

/* Main Component Settings */
InputWithLabel.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  variant: PropTypes.oneOf([
    "filled", "outlined", "standard"
  ]),
  value: PropTypes.any,
  onChange: PropTypes.func,
}
InputWithLabel.defaultProps = {
  variant: "outlined",
}

/* Exports */
export default InputWithLabel;