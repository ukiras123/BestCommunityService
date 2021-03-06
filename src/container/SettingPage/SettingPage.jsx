import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import { compose } from "redux";
import NavBar from "../../components/NavBar";
import Grid from "@material-ui/core/Grid";
import { ClippedDrawer } from "../../components/Drawer";

class SettingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  drawerHandle() {
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        user: {
          ...user,
          user
        }
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.username) {
      dispatch(userActions.updateUser(user));
    }
  }

  render() {
    const { registering, classes, alert } = this.props;
    const { user } = this.state;
    return (
      <div>
        <NavBar
          isFixed="true"
          loggedInButtons={true}
          handleDrawerOpen={this.drawerHandle}
        />
        <ClippedDrawer show={this.state.open} />
        <div className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Profile
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="firstName"
                      value={user.firstName}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="lastName"
                      value={user.lastName}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      disabled
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={user.email}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">User Name</InputLabel>
                    <Input
                      disabled
                      id="username"
                      name="username"
                      autoComplete="username"
                      value={user.username}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      name="password"
                      type="password"
                      id="password"
                      required
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {registering && (
                <img
                  alt="loading"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )}
              {alert && alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              {alert && alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

SettingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { users, authentication } = state;
  const { user } = authentication;
  const { items } = users;

  const { alert } = state;
  return {
    registering,
    alert,
    user,
    items
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(SettingPage);
