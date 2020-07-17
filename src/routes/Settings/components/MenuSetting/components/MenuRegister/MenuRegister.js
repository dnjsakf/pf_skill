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
]

/* Main Component */
const MenuRegister = props => {
  /* Props */
  const {
    mode,
    defaultValue,
    ...rest
  } = props;

  /* State */
  const [ variables, setVariables ] = useState( defaultValue || {
    group: "",
    name: "",
    label: "",
    href: "",
    icon: "",
  });

  /* Styles Hook */
  const classes = useStyles();

  /* SnackBar Hook */
  const { enqueueSnackbar } = useSnackbar();
  
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
  const handleSubmit = useCallback( event => {
    

    // mutate({
    //   variables,
    // })
  }, [ mutate, variables ]);

  /* Side Effects */
  useEffect(()=>{
    if( defaultValue ){
      setVariables( defaultValue );
    }
  }, [ defaultValue ]);

  /* Renderer */
  if( loading ) return ( <CircularProgress /> );

  return (
    <React.Fragment>
      <form noValidate autoComplete="off">
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
          <Button 
            type="submit"
            variant="outlined"
            color="primary"
            className={ classes.button }
            onClick={ handleSubmit }
          >
            저장
          </Button>
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