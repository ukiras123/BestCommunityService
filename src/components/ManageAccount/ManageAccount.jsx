import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions, checkoutActions } from "../../redux/actions";
import { ExpansionPanel } from "../ExpansionPanels";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class ManageAccount extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAll());
    dispatch(checkoutActions.getAllCheckout());
  }

  render() {
    const { checkoutItems } = this.props;
    return (
      <div>
        {checkoutItems && checkoutItems.length > 0 ? (
          <ExpansionPanel details={checkoutItems} />
        ) :
        (
          <Typography>
            There is nothing on your order history. Please buy something.
          </Typography>
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
ManageAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ManageAccount);
