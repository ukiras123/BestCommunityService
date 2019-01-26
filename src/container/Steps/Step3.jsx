import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.username &&
      user.password
    ) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering, classes, alert } = this.props;
    const { user } = this.state;

    return (
      <div>
        <div className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
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
                    <TextField
                      id="date"
                      label="Date Of Birth"
                      type="date"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                </Grid>

              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(Step3);
