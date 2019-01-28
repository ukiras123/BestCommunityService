import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";

const styles = {
  purpleAvatar: {
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
};

function LetterAvatars(props) {
  const { classes, firstName } = props;
  return (
    <Avatar className={classes.purpleAvatar}>
      {firstName && firstName.charAt(0)}
    </Avatar>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LetterAvatars);
