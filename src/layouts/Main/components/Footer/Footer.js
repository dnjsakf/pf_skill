/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/* Another Modules */
import clsx from 'clsx';

/* Constants */
const styles = theme =>({
  root: {
    padding: theme.spacing(4)
  }
});

/* Main Component */
class Footer extends React.Component {
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

/* Main Component Settings */
Footer.propTypes = {
  className: PropTypes.string
};

/* Exports */
export default withStyles(styles, { withTheme: true })( Footer );