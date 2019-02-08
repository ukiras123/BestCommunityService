import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions, checkoutActions } from "../../redux/actions";
import { ExpansionPanel } from "../ExpansionPanels";
import CustomAppBar from "../../components/AppBar/CustomAppBar";

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
        <CustomAppBar title="Order Details" variant="h6" />
        <ExpansionPanel details={checkoutItems} />
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
