/* React */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* Apollo */
import { useMutation } from 'react-apollo';
import { CREATE_SIDE_BAR_MENU } from '@graphql/SideBar/mutations';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

/* Another Components */
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@components/Progress';

/* Constant */
const useStyles = makeStyles( theme => ({
  input: {
    padding: theme.spacing(1, 1)
  },
  label: {
    marginRight: 10
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  labelPlacementStart: {
    margin: 'unset'
  }
}));

/* Main Component */
const MenuSettingForm = props => {
  /* Props */
  const {
    ...rest
  } = props;

  /* State */
  const [ variables, setVariables ] = useState({
    group: "Settings",
    name: "Mocked",
    href: "/settings",
    icon: "Settings",
  });
  
  /* Another Hooks */
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const [ mutate, { error, loading, data } ] = useMutation(
    CREATE_SIDE_BAR_MENU, {
      onError( error ){
        console.error( error );
        enqueueSnackbar('Save Failed: '+error.message, { 
          variant: 'error',
          autoHideDuration: 1500,
          transitionDuration: 150,
        });
      },
      onCompleted({ createSideBarMenu: { success } }) {
        console.log("[CREATED]", success);

        enqueueSnackbar('Save Success!!!', { 
          variant: 'success',
          autoHideDuration: 1500,
          transitionDuration: 150,
        });
      }
    }
  );

  const handleChange = useCallback( event => {
    setVariables({
      ...variables,
      [event.target.name]: event.target.value
    });
  }, [ variables ]);

  const handleSubmit = useCallback( event => {
    mutate({
      variables,
    })
  }, [ mutate, variables ]);

  if( loading ) return ( <CircularProgress /> );

  return (
    <React.Fragment>
      <FormControl
        component="fieldset"
        error={ !!error }
      >
        <FormGroup row={ false }>
          <FormControlLabel
            label="메뉴 그룹명"
            control={
              <TextField
                id="menu-group-name"
                name="group"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.input
                  }
                }}
                onChange={ handleChange }
                value={ variables.group }
              />
            }
            labelPlacement="start"
            classes={{
              label: classes.label,
              labelPlacementStart: classes.labelPlacementStart
            }}
          />
          <Divider className={ classes.divider }/>
          <FormControlLabel
            label="메뉴명"
            control={
              <TextField
                id="menu-name"
                name="name"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.input
                  }
                }}
                onChange={ handleChange }
                value={ variables.name }
              />
            }
            labelPlacement="start"
            classes={{
              label: classes.label,
              labelPlacementStart: classes.labelPlacementStart
            }}
          />
          <Divider className={ classes.divider }/>
          <FormControlLabel
            label="경로"
            control={
              <TextField
                id="menu-href"
                name="href"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.input
                  }
                }}
                onChange={ handleChange }
                value={ variables.href }
              />
            }
            labelPlacement="start"
            classes={{
              label: classes.label,
              labelPlacementStart: classes.labelPlacementStart
            }}
          />
          <Divider className={ classes.divider }/>
          <FormControlLabel
            label="아이콘"
            control={
              <TextField
                id="menu-icon"
                name="icon"
                variant="outlined"
                InputProps={{
                  classes: {
                    input: classes.input
                  }
                }}
                onChange={ handleChange }
                value={ variables.icon }
              />
            }
            labelPlacement="start"
            classes={{
              label: classes.label,
              labelPlacementStart: classes.labelPlacementStart
            }}
          />
          <Divider className={ classes.divider }/>
          <Button 
            type="submit"
            variant="outlined"
            color="primary"
            className={ classes.button }
            onClick={ handleSubmit }
          >
            저장
          </Button>
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
}

/* Main Component Settings */
MenuSettingForm.propTypes = {}
MenuSettingForm.defaultProps = {}

/* Exports */
export default MenuSettingForm;