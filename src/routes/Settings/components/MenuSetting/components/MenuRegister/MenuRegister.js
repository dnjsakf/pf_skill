/* React */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/* Apollo */
import { useMutation } from 'react-apollo';
import { CREATE_MENU, UPDATE_MENU, DELETE_MENU } from '@graphql/menu/mutations';

/* Material UI */
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

/* Another Modules */
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

/* Constant Variables */
const mapTypeToComponent = {
  "input": InputWithLabel
}

const defines = [
  {
    type: "input",
    label: "그룹명",
    id: "menu-group-name",
    name: "group",
    validation: {
      type: "name",
      required: true,
      maxLength: 100,
    }
  },
  {
    type: "input",
    label: "메뉴명",
    id: "menu-name",
    name: "name",
    validation: {
      type: "name",
      required: true,
    }
  },
  {
    type: "input",
    label: "라벨",
    id: "menu-label",
    name: "label",
    validation: {
      type: "name",
    }
  },
  {
    type: "input",
    label: "경로",
    id: "menu-href",
    name: "href",
    validation: {
      type: "path",
      maxLength: 100,
    }
  },
  {
    type: "input",
    label: "아이콘",
    id: "menu-icon",
    name: "icon",
    validation: {
      type: "name",
      maxLength: 10,
    }
  },
];

const initValue = {
  group: "",
  name: "",
  label: "",
  href: "",
  icon: "",
  sortOrder: 0,
}

/* Main Component */
const MenuRegister = props => {
  /* Props */
  const {
    defaultValue,
    ...rest
  } = props;

  /* State */
  const [ mode, setMode ] = useState( defaultValue ? "update" : "create" );
  const [ variables, setVariables ] = useState( defaultValue || initValue );

  /* Ref */
  const formRef = useRef();

  /* Styles Hook */
  const classes = useStyles();

  /* SnackBar Hook */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  /* Apollo Hook: Mutation */
  const [ createMutate, { loading: createLoading } ] = useMutation(
    CREATE_MENU, {
      onError( error ){
        enqueueSnackbar('Save Failed: '+error.message, { 
          variant: 'error',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });
      },
      onCompleted({ createMenu: { menu, success } }) {
        console.log("[CREATED]", success, menu);

        enqueueSnackbar('Save Success!!!', { 
          variant: 'success',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });

        setVariables( menu );
      }
    }
  );
  
  /* Apollo Hook: Mutation */
  const [ updateMutate, { loading: updateLoading } ] = useMutation(
    UPDATE_MENU, {
      onError( error ){
        console.error( error );
        enqueueSnackbar('Save Failed: '+error.message, { 
          variant: 'error',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });
      },
      onCompleted({ updateMenu: { menu, success } }) {
        console.log("[UPDATED]", success, menu);

        enqueueSnackbar('Save Success!!!', { 
          variant: 'success',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });

        setVariables( menu );
      }
    }
  );
  
  /* Apollo Hook: Mutation */
  const [ deleteMutate, { loading: deleteLoading } ] = useMutation(
    DELETE_MENU, {
      onError( error ){
        console.error( error );
        enqueueSnackbar('Save Failed: '+error.message, { 
          variant: 'error',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });
      },
      onCompleted({ deleteMenu: { delcount, success } }) {
        console.log("[DELETED]", success, delcount);

        enqueueSnackbar('Save Success!!!', { 
          variant: 'success',
          autoHideDuration: 1500,
          transitionDuration: 150,
          action: (
            <Button color="secondary" size="small" onClick={ ()=>{ closeSnackbar() } }>
              UNDO
            </Button>
          ),
        });

        setVariables( initValue );
        setMode( "create" );
      }
    }
  );

  /* Handlers */
  const handleSubmit = useCallback( event => {
    event.preventDefault();

    const formData = {}
    const inputs = Array.from(formRef.current.querySelectorAll('input[name]'));
    
    inputs.forEach( input => formData[input.name] = input.value );

    switch( mode ){
      case "create":
        createMutate({
          variables: formData,
        });
        break;
      case "update":
        updateMutate({
          variables: formData,
        });
        break; 
    }
    
  }, [ mode, createMutate, updateMutate ]);

  const handleDelete = useCallback( event => {
    event.preventDefault();

    if( mode == "update" ){
      const formData = {}
      const inputs = Array.from(formRef.current.querySelectorAll('input[name]'));
      
      inputs.forEach( input => formData[input.name] = input.value );

      deleteMutate({
        variables: {
          group: formData.group,
          name: formData.name
        }
      });
    }
  }, [ mode, deleteMutate ]);

  /* Side Effects */
  useEffect(()=>{
    if( defaultValue ){
      setVariables( defaultValue );
      setMode( "update" );
    } else {
      setMode( "create" );
    }
  }, [ defaultValue ]);

  /* Renderer */
  if( createLoading || updateLoading || deleteLoading ) return ( <CircularProgress /> );

  return (
    <React.Fragment>
      <span>{ mode }</span>
      <form ref={ formRef } noValidate autoComplete="off">
        <FormControl
          component="fieldset"
          error={ true }
        >
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
                    defaultValue={ variables[others.name] }
                  />
                  <Divider className={ classes.divider }/>
                </React.Fragment>
              );
            })
          }
          <ButtonGroup>
            <Button 
              type="submit"
              variant="outlined"
              color="primary"
              className={ classes.button }
              onClick={ handleSubmit }
            >
              저장
            </Button>
            <Button 
              type="submit"
              variant="outlined"
              color="primary"
              className={ classes.button }
              onClick={ handleDelete }
            >
              삭제
            </Button>
          </ButtonGroup>
        </FormControl>
      </form>
    </React.Fragment>
  );
}

/* Main Component Settings */
MenuRegister.propTypes = {
  mode: PropTypes.oneOf(['update', 'create']),
  defaultValue: PropTypes.shape({
    group: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
  }),
}

/* Exports */
export default MenuRegister;