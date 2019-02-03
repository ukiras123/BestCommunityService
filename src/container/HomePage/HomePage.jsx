import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import SimpleTab from "../../components/Tabs/SimpleTab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { Link } from "react-router-dom";

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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  drawerHandle() {
    console.log("handling now", this.state.open);
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          handleDrawerOpen={this.drawerHandle}
          loggedInButtons="true"
        />
        <ClippedDrawer toSelect="Home" show={this.state.open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container>
            <Grid justify="center" container >
              <Typography
                component="h3"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                We believe in Humanity
              </Typography>
            </Grid>
            <Grid justify="center" container>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                component="p"
              >
                Show that you do too.
              </Typography>
            </Grid>
            <Grid justify="center" container>
              <div className={classes.action}>
                <Link to="/donate" style={{ textDecoration: "none" }}>
                  <Button
                    size="large"
                    className={classes.autoMargin}
                    color="secondary"
                    variant="outlined"
                  >
                    Donate Now
                  </Button>
                </Link>
                <Link to="/volunteer" style={{ textDecoration: "none" }}>
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
            </Grid>
            <Grid justify="center" container >
              <SimpleTab option={option} />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
