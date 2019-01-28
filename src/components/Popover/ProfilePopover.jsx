import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import { compose } from "redux";
import { Avatar } from "../Avatar";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class ProfilePopover extends React.Component {
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

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { user } = this.props;

    return (
      <div>
        <Button onClick={this.handleClick}>
          <Typography variant="h6" align="center" color="textSecondary">
            Hi {user && user.firstName} &nbsp;
          </Typography>
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
      </div>
    );
  }
}

ProfilePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ProfilePopover);
