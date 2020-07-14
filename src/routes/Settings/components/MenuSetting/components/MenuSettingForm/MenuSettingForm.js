/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { compose } from 'redux';

/* Apollo */
import { Mutation } from 'react-apollo';
import { CREATE_SIDE_BAR_MENU } from '@graphql/SideBar/mutations';

/* Material UI */
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

/* Another Components */
import clsx from 'clsx';

/* Constant */
const styles = theme => ({
  input: {
    padding: theme.spacing(1, 1)
  },
  label: {
    marginRight: 10
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
});

/* Main Component */
class MenuSettingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: true,
      error: false,
      data: {
        group: "",
        name: "",
        href: "",
        icon: "",
      }
    }

    this.setFormData = this.setFormData.bind( this );
    this.handleSubmit = this.handleSubmit( this );
  }

  setFormData(event){
    const name = event.target.name;
    const value = event.target.value;

    this.setState(( state )=>(
      Object.assign({}, state, {
        data: {
          ...state.data,
          [name]: value
        }
      })
    ));
  }

  handleSubmit( mutate ){
    console.log('submit')
    console.log( mutate );
  }

  render() { 
    const {
      classes,
      ...rest
    } = this.props;

    const {
      error,
      data
    } = this.state;

    return (
      <React.Fragment>
        <Mutation
          mutation={ CREATE_SIDE_BAR_MENU }
          variables={ data }
          onCompleted={( result ) => {
            console.log( result );
            // this.props.history.push('/settings')
          }}
        >
        {
          createSideBarMenu => (
            // <form action="POST" onSubmit={ this.handleSubmit }>
              <FormControl
                component="fieldset"
                error={ error }
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
                        onChange={ this.setFormData }
                      />
                    }
                    labelPlacement="start"
                    classes={{
                      label: classes.label
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
                        onChange={ this.setFormData }
                      />
                    }
                    labelPlacement="start"
                    classes={{
                      label: classes.label
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
                        onChange={ this.setFormData }
                      />
                    }
                    labelPlacement="start"
                    classes={{
                      label: classes.label
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
                        onChange={ this.setFormData }
                      />
                    }
                    labelPlacement="start"
                    classes={{
                      label: classes.label
                    }}
                  />
                  <Button 
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={ classes.button }
                    onClick={ ()=>{ this.handleSubmit( createSideBarMenu ) } }
                    onClick={ createSideBarMenu }
                  >
                    저장
                  </Button>
                  <Divider className={ classes.divider }/>
                </FormGroup>
              </FormControl>
            // </form>
          )
        }
        </Mutation>
      </React.Fragment>
    );
  }
}

/* Main Component Settings */
MenuSettingForm.propTypes = {}
MenuSettingForm.defaultProps = {}

/* Exports */
export default compose(
  withStyles( styles, { withTheme: true } ),
)( MenuSettingForm );