/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* Another Modules */
import clsx from 'clsx';

/* Hooks */
const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

/* Contants */
const user = {
  name: 'Dochi',
  avatar: '/public/images/avatars/dochi.jpeg',
  bio: 'Developer'
};

/* Component */
const Profile = ( props )=>{
  const classes = useStyles();
  const {
    className,
    ...rest
  } = props;

  /* Rendering */
  return (
    <div
      {...rest}
      className={ clsx(classes.root, className) }
    >
      <Avatar
        alt="Person"
        className={ classes.avatar }
        component={ RouterLink }
        src={ user.avatar }
        to="/settings"
      />
      <Typography
        className={ classes.name }
        variant="h4"
      >
        { user.name }
      </Typography>
      <Typography variant="body2">
        { user.bio }
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;