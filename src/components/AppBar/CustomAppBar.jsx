import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  appBar: {
    backgroundColor: "#E6E6FA",
  },
  toolbarTitle: {}
});

function CustomAppBar(props) {
  const { classes, title, style, variant } = props;

  return (
    <AppBar position="relative" color="default" className={classes.appBar}>
      <Toolbar style={style} className={classes.toolbar}>
        <Typography
          variant={variant || "h5"}
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomAppBar);
