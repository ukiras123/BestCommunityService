import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexGridCheckout } from "../../components/ComplexGrid";
import { EmptyCart } from "../../components/EmptyCart";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { OrderSummary } from "../../components/OrderSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { getUserProducts } from "../../_helpers/util";
import { getCheckoutSummary } from "../../_helpers/util";
import {
  rentActions,
  cateringActions,
  hallActions,
  checkoutActions
} from "../../redux/actions";
import { Button, LinearProgress, Link } from "@material-ui/core";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { Paypal } from "../../_helpers/const";
import { types } from "../../_helpers/const";
import green from "@material-ui/core/colors/green";
const { RENT, CATERING, HALL } = types;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  fixed: {
    position: "fixed"
  },
  button1: {
    "&:hover": {
      background: "#2098D1"
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  allCenter: {
    textAlign: "center"
  }
});

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      alert: {
        message: "",
        type: ""
      },
      loading: false,
      checkoutSuccess: false
    };
    this.drawerHandle = this.drawerHandle.bind(this);
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
  };

  drawerHandle() {
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  handleRemove = (id, type) => {
    const { dispatch } = this.props;
    if (id && type === RENT) {
      dispatch(rentActions.removeARental(id));
    } else if (id && type === CATERING) {
      dispatch(cateringActions.removeACatering(id));
    } else if (id && type === HALL) {
      dispatch(hallActions.removeAHall(id));
    }
  };

  handleCheckout = (items, summary) => {
    this.setState({ loading: true });
    setTimeout(() => {
      const { dispatch } = this.props;
      const checkoutDetails = { items, summary, date: new Date(), orderId: Math.floor(Math.random() * 9999999999 + 1) };
      dispatch(checkoutActions.checkout(checkoutDetails));
      this.setState({ checkoutSuccess: true, loading: false });
    }, 2400);
  };

  render() {
    const { classes, user, users } = this.props;
    const { alert, loading, checkoutSuccess } = this.state;
    const summary = getCheckoutSummary(user, users);
    const items = getUserProducts(user, users);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          handleDrawerOpen={this.drawerHandle}
          loggedInButtons="true"
        />
        <ClippedDrawer show={this.state.open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!items && !checkoutSuccess && <EmptyCart />}
          {!items && checkoutSuccess && (
            <div className={classes.allCenter}>
              <Typography variant="h4" component="h4" align="center">
                Checkout Succeeded
              </Typography>
              <Typography variant="subtitle1" align="center">
                We will send you a confirmation shortly. Go Back to{" "}
                <Link href="/home">Home.</Link>
              </Typography>
              <img
                className={classes.smallImage}
                alt="complex"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQek3DywSpbH6ALce-qH9L5THJTYdr44-18Krx-TL1EvhA4O7Hu"
              />
            </div>
          )}
          {items && summary && (
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} lg={8} md={8}>
                <CustomAppBar
                  title="Shopping Cart"
                  style={{
                    backgroundColor: "#CAE6F8"
                  }}
                />
                {items.map((product, index) => (
                  <ComplexGridCheckout
                    key={index}
                    options={product}
                    handleAdd={this.handleAdd}
                    handleRemove={this.handleRemove}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
                <CustomAppBar
                  title="Summary"
                  style={{
                    backgroundColor: "#CAE6F8"
                  }}
                />
                <OrderSummary summary={summary} />
                <div className={classes.wrapper}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    className={classes.button1}
                    disabled={loading}
                    onClick={() => {
                      this.handleCheckout(items, summary);
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h6"
                      align="center"
                      color="textSecondary"
                    >
                      Checkout For Free
                    </Typography>
                  </Button>
                  {loading && <LinearProgress />}
                </div>
                <Button
                  fullWidth
                  variant="text"
                  color="inherit"
                  className={classes.button1}
                >
                  <PaypalExpressBtn
                    env={Paypal.sandBoxEnv}
                    client={Paypal.client}
                    currency={Paypal.currency}
                    total={summary.total}
                    onError={this.onError}
                    onSuccess={this.onSuccess}
                    onCancel={this.onCancel}
                  />
                </Button>
                Note: This Paypal payment is in Sandbox so your account will not
                be charged. You can try.
                {alert && alert.message && alert.type && (
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                )}
              </Grid>
            </Grid>
          )}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users: allUser, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users: allUser.items
  };
}
CheckoutPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(CheckoutPage);
