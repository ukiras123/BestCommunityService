import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import StartingButtons from '../StartingButtons'

function NavBar(props) {
  const { classes, landingButtons } = props;
  return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/main">
        <img className={classes.logo} alt="logo" src={logo}></img>
        </Link>
          <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
            Best Community Service
          </Typography>
          {landingButtons && <StartingButtons />}
        </Toolbar>
      </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);