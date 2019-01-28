import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";

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

function FreeClassesPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar isFixed="true" loggedInButtons="true" />
      <ClippedDrawer toSelect="Free Classes" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Free Classes</Typography>
      </main>
    </div>
  );
}

FreeClassesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FreeClassesPage);
