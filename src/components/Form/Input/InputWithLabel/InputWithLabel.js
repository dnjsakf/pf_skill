/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

/* Utils */
import { checkValidation } from '@utils/validation';

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
    mode,
    label,
    defaultValue,
    validation,
    ...rest
  } = props;

  /* State */
  const [ value, setValue ] = useState( defaultValue||"" );
  const [ error, setError ] = useState({
    flag: false,
    message: "",
  });
  
  /* Styles Hook */
  const classes = useStyles();

  /* Handlers */
  const handleChange = useCallback( event => {
    setValue( event.target.value );
  }, [ value ]);

  /* Side Effects */
  useEffect(()=>{
    setValue( defaultValue );
  }, [ defaultValue ]);

  useEffect(()=>{
    setError( checkValidation( value, validation ) );
  },[ value ]);
  
  /* Renderer */
  return (
    <FormControlLabel
      label={ label }
      control={
        <TextField
          error={ error.flag }
          helperText={ error.flag && error.message }
          InputProps={{
            classes: {
              input: classes.input
            },
            readOnly: (mode == "update" && validation.readOnly),
            disabled: (mode == "update" && validation.disabled),
          }}
          value={ value }
          onChange={ handleChange }
          { ...rest }
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
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
}
InputWithLabel.defaultProps = {
  mode: "create",
  variant: "outlined",
}

/* Exports */
export default InputWithLabel;