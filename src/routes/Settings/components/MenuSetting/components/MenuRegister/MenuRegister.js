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
import clsx from 'clsx';
import { useSnackbar } from 'notistack';

/* Custom Components */
import { CircularProgress } from '@components/Progress';
import { InputWithLabel } from '@components/Form/Input';

/* Styles Hook */
const useStyles = makeStyles( theme => ({
  buttonGroup: {    
    alignItems: 'center',
  },
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
      readOnly: true,
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
      readOnly: true,
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

const MODE = {
  UPDATE: MODE.UPDATE,
  CREATE: MODE.CREATE,
  DELETE: "delete",
}

/* Sub Component */
const CloseButton = props => {
  const {
    onClose,
    ...rest
  } = props;
  
  return (
    <Button color="secondary" size="small" onClick={ onClose }>
      Close
    </Button>
  );
}

/* Custom Hook */
const useResultAlert = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const chandleClose = () => {
    closeSnackbar();
  }
  
  const handleSnackbar = (type, message) => {
    enqueueSnackbar(message, { 
      variant: type,
      autoHideDuration: 1500,
      transitionDuration: 150,
      action: ( <CloseButton onClose={ chandleClose }/> ),
    })
  }
  
  return handleSnackbar;
}

/* Main Component */
const MenuRegister = props => {
  /* Props */
  const {
    defaultValue,
    ...rest
  } = props;

  /* State */
  const [ mode, setMode ] = useState( defaultValue ? MODE.UPDATE : MODE.CREATE );
  const [ variables, setVariables ] = useState( defaultValue || initValue );
  const [ error, setError ] = useState( false );

  /* Ref */
  const formRef = useRef();

  /* Styles Hook */
  const classes = useStyles();

  /* SnackBar Hook */
  const customSnackbar = useResultAlert();
  
  /* Apollo Hook: Mutation */
  const [ createMutate, { loading: createLoading } ] = useMutation(
    CREATE_MENU, {
      onError( error ){
        customSnackbar('error', 'Create failed: '+error.message);
        setError( true );
      },
      onCompleted({ createMenu: { menu, success } }) {
        customSnackbar('success', 'Create completed');
        
        if( success ){
          setVariables( menu );
        }
        setError( !success );
      }
    }
  );
  
  /* Apollo Hook: Mutation */
  const [ updateMutate, { loading: updateLoading } ] = useMutation(
    UPDATE_MENU, {
      onError( error ){
        customSnackbar('error', 'Update failed: '+error.message);
        setError( true );
      },
      onCompleted({ updateMenu: { menu, success } }) {
        customSnackbar('success', 'Update completed.');

        if( success ){
          setVariables( menu ); 
        }
        setError( !success );
      }
    }
  );
  
  /* Apollo Hook: Mutation */
  const [ deleteMutate, { loading: deleteLoading } ] = useMutation(
    DELETE_MENU, {
      onError( error ){
        customSnackbar('error', 'Delete failed: '+error.message);
        setError( true );
      },
      onCompleted({ deleteMenu: { delcount, success } }) {
        customSnackbar('success', 'Delete completed.');

        if( success ){
          setVariables( initValue );
          setMode( MODE.CREATE );
        }
        setError( !success );
      }
    }
  );

  /* Handlers */
  const handleCancel = useCallback( event => {
    setMode(MODE.CREATE);
    setVariables( initValue );
  }, [  ]);
  
  const handleSubmit = useCallback( event => {
    event.preventDefault();

    const formData = {}
    const inputs = Array.from(formRef.current.querySelectorAll('input[name]'));
    
    inputs.forEach( input => formData[input.name] = input.value );

    switch( mode ){
      case MODE.CREATE:
        createMutate({
          variables: formData,
        });
        break;
      case MODE.UPDATE:
        updateMutate({
          variables: formData,
        });
        break; 
    }
    
  }, [ mode, createMutate, updateMutate ]);

  const handleDelete = useCallback( event => {
    event.preventDefault();

    if( mode == MODE.UPDATE ){
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
      setMode( MODE.UPDATE );
    } else {
      setMode( MODE.CREATE );
    }
  }, [ defaultValue ]);

  /* Renderer */
  if( createLoading || updateLoading || deleteLoading ) return ( <CircularProgress /> );

  return (
    <React.Fragment>
      <form ref={ formRef } noValidate autoComplete="off">
        <FormGroup>
          <Button type="submit"
            className={ classes.button }
            onClick={ handleDelete }
          >
            삭제
          </Button>
        </FormGroup>
        <FormGroup>
          <FormControl  
            component="fieldset"
            error={ error }
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
                      mode={ mode }
                      defaultValue={ variables[others.name] }
                    />
                    <Divider className={ classes.divider }/>
                  </React.Fragment>
                );
              })
            }
            <div className={ classes.buttonGroup }>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                {
                  mode == MODE.UPDATE && (
                    <Button 
                      type="submit"
                      className={ classes.button }
                      onClick={ handleCancel }
                    >
                      취소
                    </Button>
                  )
                }
                <Button 
                  type="submit"
                  className={ classes.button }
                  onClick={ handleSubmit }
                >
                  저장
                </Button>
              </ButtonGroup>
            </div>
          </FormControl>
        </FormGroup>
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