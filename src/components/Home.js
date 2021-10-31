import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import logo from './logo-home-page.png';
import {
  InputBase,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const styles = theme => ({
  content: {
  	 ...theme.mixins.gutters(),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
     
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    alignItems:'center', 
    justifyContent:'center',
    position: 'relative',
    marginLeft: '8px',
    width: 'auto',
    float: 'left',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
   searchIcon: {
    width: 119,
    height: '100%',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  logo: {
    width: 400,
    height: 200
}
});

function Home(props) {
  let history = useHistory();

  function handleSearch(){ // changed the "handleSearch()" function

    history.replace("/dashboard")
    }
  const { classes } = props;
  return (
    <div className={classes.content}>
        <img src={logo} alt="logo" className={classes.logo} />
        <div className={classes.search}>
            <div className={classes.searchIcon} onClick={handleSearch}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);