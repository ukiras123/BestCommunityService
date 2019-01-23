import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import StartingButtons from '../StartingButtons'
import {ProfilePopover} from '../Popover'

function NavBar(props) {
  const { classes, isFixed, landingButtons, loggedInButtons } = props;
  const position = isFixed ? "fixed" : "relative";
  return (
      <AppBar position={position} color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/main">
        <img className={classes.logo} alt="logo" src={logo}></img>
        </Link>
          <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
            Best Community Service
          </Typography>
          {landingButtons && <StartingButtons />}
          {loggedInButtons && <ProfilePopover />}
        </Toolbar>
      </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);