/* React */
import React, { useState, useCallback, useEffect } from 'react';
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

/* Utils */
const mapValidTypeToPattern = {
  "name": (r="*", s=-1, e=-1)=>({
    pattern: new RegExp(`^[a-zA-Z가-힣_-]${ s >= 0 ? `{${s},${e}}` : r }$`, "g"),
    message: `only string. ${ s >= 0 ? `${s}~${e}` : '' }`
  }),
  "path": (r="*", s=-1, e=-1)=>({
    pattern: new RegExp(`^(?:[a-zA-Z가-힣_-]|\/)${ s >= 0 ? `{${s},${e}}` : r }$`, "g"),
    message: `only string and '/'. ${ s >= 0 ? `${s}~${e}` : '' }`
  }),
}

const checkValidation = ( value, validation ) => {
  const { 
    type, 
    args,
    required,
    maxLength
  } = validation;

  const mapped = mapValidTypeToPattern[type];

  if ( mapped ){
    let mappedArgs = args;
    if( !args && required ){
      mappedArgs = [ "+" ]
      if( maxLength > 0 ){
        mappedArgs = [ null, 1, maxLength ]
      }
    }

    const { pattern, message } = mapped.apply(null, mappedArgs);

    if( value ){
      const isError = pattern && !value.match( pattern );
  
      return { flag: isError, message: isError ? message : "" }
    }

    return { flag: false, message: "" }
  }
}

/* Main Component */
const InputWithLabel = props => {
  /* Props */
  const {
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
  variant: "outlined",
}

/* Exports */
export default InputWithLabel;