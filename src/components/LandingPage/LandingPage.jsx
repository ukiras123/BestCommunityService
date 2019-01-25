import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import NavBar from '../NavBar'
import Footer from '../Footer'
import LandingBody from '../LandingBody'

function LandingPage(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar isFixed="true" landingButtons='true'/>
      <LandingBody />
      <Footer />
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);