import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = theme => ({});

class WhatsHappening extends React.Component {
  render() {
    return (
      <div>
        <a
          href="https://twitter.com/intent/tweet?button_hashtag=Nature&ref_src=twsrc%5Etfw"
          class="twitter-hashtag-button"
          data-show-count="false"
        >
          Tweet #Nature
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
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
WhatsHappening.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(WhatsHappening);
