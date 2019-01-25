import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import SimpleTab from "../../components/Tabs/SimpleTab";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  autoMargin: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  action: {
    marginTop: "20px",
    marginBottom: "60px",
    textAlign: "center"
  },
  heroContent: {
    maxWidth: 800,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 1}px 0 ${theme.spacing.unit * 1}px`
  }
});

const option = [
  {
    title: "View Our Photo Gallery",
    component: ImageGallery,
    isComponent: true
  },
  {
    title: "Manage Your Account",
    component: "Manage Your Account soobn",
    isComponent: false
  },
  {
    title: "See What's Happening ",
    component: "See the latest from our company soon",
    isComponent: false
  }
];

function HomePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar isFixed="true" loggedInButtons="true" />
      <ClippedDrawer toSelect="Home" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.heroContent}>
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            We believe in Humanity
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            component="p"
          >
            Show that you do too.
          </Typography>
          <div className={classes.action}>
          <Link to="/donate">

            <Button
              size="large"
              className={classes.autoMargin}
              color="secondary"
              variant="outlined"
            >
              Donate Now
            </Button>
            </Link>
            <Link to="/volunteer">
            <Button
              size="large"
              className={classes.autoMargin}
              color="secondary"
              variant="outlined"
            >
              Volunteer
            </Button>
            </Link>
          </div>
        </div>
        <Divider />
        <SimpleTab option={option} />
      </main>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
