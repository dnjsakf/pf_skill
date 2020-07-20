/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/* Another Modules */
import clsx from 'clsx';

/* Styles Hook */
const useStyles = makeStyles( theme =>({
  root: {
    padding: theme.spacing(4)
  }
}));

/* Main Component */
const Footer = props => {
  /* Props */
  const {
    className,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();
  
  /* Renderer */
  return (
    <div
      {...rest}
      className={ clsx(classes.root, className) }
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://github.com/dnjsakf/pf_skill"
          target="_blank"
        >
        { "허도치" }
        </Link>
        { ". 2020" }
      </Typography>
      <Typography variant="caption">
      { "나의 첫번째 투두리스트!" }
      </Typography>
    </div>
  );
  
}

/* Main Component Settings */
Footer.propTypes = {
  className: PropTypes.string
};

/* Exports */
export default Footer;