import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { connect } from "react-redux";
import { compose } from "redux";
import { Typography } from "@material-ui/core";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { Paypal } from "../../_helpers/const";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { history } from "../../_helpers";
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
  },
  smallImage: {
    width: 60,
    height: 40
  }
});

class DonatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: "1",
      amount: 1,
      alert: {
        message: "",
        type: ""
      }
    };
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  drawerHandle() {
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  onSuccess = payment => {
    // Congratulation, it came here means everything's fine!
    const { alert } = this.state;
    const newAlert = {
      message: "The payment was succeeded! Thank You.",
      type: "alert-success"
    };
    this.setState({
      alert: {
        ...alert,
        ...newAlert
      }
    });
    setTimeout(function() {
      history.push("/");
    }, 3000);
  };

  onCancel = data => {
    // User pressed "cancel" or close Paypal's popup!
    const { alert } = this.state;
    const newAlert = {
      message: "The payment was cancelled!",
      type: "alert-danger"
    };
    this.setState({
      alert: {
        ...alert,
        ...newAlert
      }
    });

    setTimeout(function() {
      history.push("/");
    }, 3000);
  };

  onError = err => {
    const { alert } = this.state;
    const newAlert = {
      message: "Error!",
      type: "alert-danger"
    };
    this.setState({
      alert: {
        ...alert,
        ...newAlert
      }
    });

    setTimeout(function() {
      history.push("/");
    }, 4000);
  };

  handleChange = event => {
    const amount =
      event.target.value === "x"
        ? Math.floor(Math.random() * 20) + 5
        : Number(event.target.value);
    this.setState({ value: event.target.value, amount });
  };

  render() {
    const { classes, user } = this.props;
    const { alert } = this.state;
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
            Please select how much you wish to donate
          </Typography>
          <div className={classes.align}>
            {alert && alert.message && alert.type && (
              <div className={`alert ${alert.type}`}>
                {alert.message}
                <img
                  className={classes.smallImage}
                  alt="complex"
                  src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif"
                />
              </div>
            )}
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Donation"
                name="donation1"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="$1 - Can feed 20 person in Africa"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="$5 - Can help a kid get to school for a month"
                />
                <FormControlLabel
                  value="x"
                  control={<Radio />}
                  label="Random - Take a risk, might be worth it (< $20)"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.align}>
            <PaypalExpressBtn
              env={Paypal.sandbox}
              client={Paypal.client}
              currency={Paypal.currency}
              total={this.state.amount}
              onError={this.onError}
              onSuccess={this.onSuccess}
              onCancel={this.onCancel}
            />
            Note: This Payment is in Sandbox so your account will not be
            charged. You can try.
          </div>
        </main>
      </div>
    );
  }
}

DonatePage.propTypes = {
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
)(DonatePage);
