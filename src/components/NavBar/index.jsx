import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MediaQuery from "react-responsive";
import styles from "./styles";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import StartingButtons from "../StartingButtons";
import { ProfilePopover } from "../Popover";

class NavBar extends React.Component {
  render() {
    const {
      classes,
      isFixed,
      landingButtons,
      loggedInButtons,
      handleDrawerOpen,
    } = this.props;
    const position = isFixed ? "fixed" : "fixed";

    return (
      <AppBar position={position} color="default" className={classes.appBar}>
        <Toolbar>
          {handleDrawerOpen && loggedInButtons && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/main">
            <img className={classes.logo} alt="logo" src={logo} />
          </Link>
          <MediaQuery minDeviceWidth={1224}>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              Best Community Service
            </Typography>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              BCS
            </Typography>
          </MediaQuery>

          {landingButtons && <StartingButtons />}
          {loggedInButtons && <ProfilePopover />}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(NavBar);
