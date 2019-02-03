import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { LinearStepper } from "../../components/Stepper";
import { connect } from "react-redux";
import { compose } from "redux";
import { Typography } from "@material-ui/core";
import { ClippedDrawer } from "../../components/Drawer";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    alignText: "center"
  },
  toolbar: theme.mixins.toolbar,
  align: {
    textAlign: "center"
  }
});

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  drawerHandle() {
    console.log("handling now", this.state.open);
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  render() {
    const { classes, user } = this.props;
    const loggedInButtons = user ? true : false;
    const landingButtons = loggedInButtons ? false : true;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          loggedInButtons={loggedInButtons}
          landingButtons={landingButtons}
          handleDrawerOpen={this.drawerHandle}
        />
        {loggedInButtons && <ClippedDrawer show={this.state.open} />}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography
            component="h6"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
            className={classes.align}
          >
            Register with your information and we will reach out to you soon.
          </Typography>
          <div className={classes.align}>
            <LinearStepper
              dispatch={this.props.dispatch}
              volunteerInfo={this.props.volunteer}
              alert={this.props.alert}
            />
          </div>
        </main>
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { alert, authentication, volunteer } = state;
  const { user } = authentication;

  return {
    user,
    volunteer,
    alert
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(CheckoutPage);
