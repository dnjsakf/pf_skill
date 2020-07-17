/* React */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Apollo */
import { useMutation } from 'react-apollo';
import { CREATE_MENU } from '@graphql/menu/mutations';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

/* Another Modules */
import clsx from 'clsx';
import { useSnackbar } from 'notistack';

/* Custom Components */
import { CircularProgress } from '@components/Progress';
import { InputWithLabel } from '@components/Form/Input';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  divider: {
    margin: theme.spacing(1, 0)
  },
}));

/* Constants */
const mapTypeToComponent = {
  "input": InputWithLabel
}

const defines = [
  {
    type: "input",
    label: "그룹명",
    id: "menu-group-name",
    name: "group",
  },
  {
    type: "input",
    label: "메뉴명",
    id: "menu-name",
    name: "name",
  },
  {
    type: "input",
    label: "라벨",
    id: "menu-label",
    name: "label",
  },
  {
    type: "input",
    label: "경로",
    id: "menu-href",
    name: "group",
  },
  {
    type: "input",
    label: "아이콘",
    id: "menu-icon",
    name: "icon",
  },
]

/* Main Component */
const MenuRegister = props => {
  /* Props */
  const {
    mode,
    initData,
    ...rest
  } = props;

  /* State */
  const [ variables, setVariables ] = useState( initData || {
    group: "",
    name: "",
    label: "",
    href: "",
    icon: "",
  });

  /* Styles Hook */
  const classes = useStyles();

  /* SnackBar Hook */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  /* Apollo Hook: Mutation */
  const [ mutate, { error, loading, data } ] = useMutation(
    CREATE_MENU, {
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

  /* Handlers */
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

  /* Side Effects */
  useEffect(()=>{
    if( initData ){
      setVariables( initData );
    }
  }, [ initData ]);

  /* Renderer */
  if( loading ) return ( <CircularProgress /> );

  return (
    <React.Fragment>
      <FormControl
        component="fieldset"
        error={ !!error }
      >
        <FormGroup>
          {
            defines.map( info => {
              const {
                type,
                ...others
              } = info;
              
              const Component = mapTypeToComponent[type];
              
              if( !Component ){ return ( <span>Error</span> ) };
              
              return (
                <React.Fragment key={ info.id }>
                  <Component
                    { ...others }
                    value={ variables[others.name] }
                    onChange={ handleChange }
                  />
                  <Divider className={ classes.divider }/>
                </React.Fragment>
              );
            })
          }
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
MenuRegister.propTypes = {
  mode: PropTypes.oneOf(['update', 'create']),
  initData: PropTypes.shape({
    group: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
  }),
}

/* Exports */
export default MenuRegister;