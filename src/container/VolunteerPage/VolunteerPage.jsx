import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/NavBar'
import {ClippedDrawer} from '../../components/Drawer'
import  {LinearStepper }from '../../components/Stepper'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});


function VolunteerPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
    <CssBaseline />
    <NavBar isFixed="true" loggedInButtons="true" />

    <main className={classes.content}>
      <div className={classes.toolbar} />
      <LinearStepper />

    </main>
  </div>
  )
}

VolunteerPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolunteerPage);