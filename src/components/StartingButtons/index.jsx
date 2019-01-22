import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { Link } from "react-router-dom";

function StartingButtons(props) {
  const { classes } = props;

  return (
    <div>
      <Link to="/register">
        <Button
          className={classes.autoMargin}
          variant="contained"
          color="secondary"
        >
          Get Started
        </Button>
      </Link>
      <Button className={classes.autoMargin} color="primary" variant="outlined">
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}

StartingButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartingButtons);
