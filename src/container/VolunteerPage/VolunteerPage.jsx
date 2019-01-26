import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { LinearStepper } from "../../components/Stepper";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class VolunteerPage extends React.Component {
  render() {
    const { classes, user } = this.props;
    const loggedInButtons = user ? true : false;
    const landingButtons = loggedInButtons ? false : true;
    console.log("loggedInButtons", loggedInButtons);
    console.log("landingButtons", landingButtons);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          loggedInButtons={loggedInButtons}
          landingButtons={landingButtons}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <LinearStepper dispatch={this.props.dispatch} volunteerInfo={this.props.volunteer}/>
        </main>
      </div>
    );
  }
}

VolunteerPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { authentication , volunteer} = state;
  const { user } = authentication;
  return {
    user,
    volunteer
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(VolunteerPage);
