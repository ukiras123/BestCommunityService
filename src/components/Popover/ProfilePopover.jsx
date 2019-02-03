import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import { compose } from "redux";
import { Avatar } from "../Avatar";
import { prodNum } from "../../_helpers/util";
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  },
  buttonI: {
    textTransform: "none"
  },
  badge: {
    top: "20%",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

class ProfilePopover extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  handleLogOout() {
    return e => this.props.dispatch(userActions.logout());
  }

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  getGreeting() {
    var d = new Date();
    var time = d.getHours();
    if (time < 12) {
      return "Good morning!";
    } else if (time < 17) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { user, users, classes, showGreeting } = this.props;
    const greeting = this.getGreeting();
    const checkoutNum = prodNum(user, users) || 0;

    return (
      <div>
        <Button onClick={this.handleClick} className={classes.buttonI}>
          {showGreeting && (
            <Typography
              variant="h6"
              component="h6"
              align="center"
              color="textSecondary"
            >
              {greeting || "Hi"} {user && user.firstName} &nbsp;
            </Typography>
          )}
          <Avatar firstName={user && user.firstName} />
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <List>
            <Link style={{ textDecoration: "none" }} to="/setting">
              <ListItem button key="1">
                <ListItemText primary="Account Setting" />
              </ListItem>
            </Link>
            <ListItem button onClick={this.handleLogOout()} key="2">
              <ListItemText primary="LogOut" />
            </ListItem>
          </List>
        </Popover>

        <Link style={{ textDecoration: "none" }} to="/checkout">
          <IconButton aria-label="Cart">
            <Badge
              badgeContent={checkoutNum}
              color="secondary"
              classes={{ badge: classes.badge }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </div>
    );
  }
}

ProfilePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { users: allUser, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users: allUser.items
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ProfilePopover);
