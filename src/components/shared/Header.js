import React from 'react';
import logo from '../logo.png';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import './Header.css';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
      width: 50,
      height: 50
  }
});
class Header extends React.Component {
  render() {
  const { classes } = this.props;
  return (<AppBar position="static">
     <Toolbar>
        <img src={logo} alt="logo" className={classes.logo} />
          <Typography variant="h6" color="inherit" noWrap>
            TAXIFY
          </Typography>
          <div className={classes.grow}/>
   
         
        </Toolbar>
  </AppBar>
  );
}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);