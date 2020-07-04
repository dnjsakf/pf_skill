import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import clsx from 'clsx';

const styles = theme =>({
  root: {
    padding: theme.spacing(4)
  }
});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const {
      theme,
      classes,
      className,
      ...rest
    } = this.props;
    
    return (
      <div
        {...rest}
        className={ clsx(classes.root, className) }
      >
        <Typography variant="body1">
          &copy;{' '}
          <Link
            component="a"
            href="https://github.com/dnjsakf/todolist"
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
}

Footer.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles, { withTheme: true })( Footer );