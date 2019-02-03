import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexGridCheckout } from "../../components/ComplexGrid";
import { EmptyCart } from "../../components/EmptyCart";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Grid from "@material-ui/core/Grid";
import { OrderSummary } from "../../components/OrderSummary";
import { connect } from "react-redux";
import { compose } from "redux";
import { getUserProducts } from "../../_helpers/util";
import { getCheckoutSummary } from "../../_helpers/util";

import { rentActions } from "../../redux/actions";
import { Button } from "@material-ui/core";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { Paypal } from "../../_helpers/const";

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

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      alert: {
        message: "",
        type: ""
      }
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

  handleAdd = detail => {
    const { dispatch } = this.props;
    if (detail) {
      dispatch(rentActions.addARental(detail));
    }
  };

  handleRemove = id => {
    const { dispatch } = this.props;
    if (id) {
      dispatch(rentActions.removeARental(id));
    }
  };

  render() {
    const { classes, user, users } = this.props;
    const { alert } = this.state;
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
          {!items && <EmptyCart />}
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
                <Button fullWidth variant="contained" color="inherit">
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
                Note: This Payment is in Sandbox so your account will not be
                charged. You can try.
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
