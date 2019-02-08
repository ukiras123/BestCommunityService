import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions, checkoutActions } from "../../redux/actions";
import { ExpansionPanel } from "../ExpansionPanels";
import { Typography, Grid } from "@material-ui/core";

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  allCenter: {
    textAlign: "center"
  },
  smallImage: {
    width: 400,
    height: 400
  }
});

class OrderDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAll());
    dispatch(checkoutActions.getAllCheckout());
  }

  render() {
    const { checkoutItems, classes } = this.props;
    return (
      <div>
        {checkoutItems && checkoutItems.length > 0 ? (
          <ExpansionPanel details={checkoutItems.reverse()} />
        ) : (
          <Grid className={classes.allCenter}>
              <Typography variant="headline" align="center">
                There is nothing on your order history. Please buy something.
              </Typography>

              <img
                className={classes.smallImage}
                alt="complex"
                src="https://cdn.dribbble.com/users/357929/screenshots/2276751/orderup-emptystate-sadbag.png"
              />
          </Grid>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users: allUser, authentication, checkout } = state;
  const { user } = authentication;
  return {
    user,
    users: allUser.items,
    checkoutItems: checkout.checkoutItems
  };
}
OrderDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(OrderDetails);
