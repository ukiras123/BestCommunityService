import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { volunteerActions } from "../../redux/actions/volunteer.action";
const _ = require('lodash');

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        firstName: "",
        lastName: "",
        email: "",
        date: "",
        existingUser: false
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { user , volunteerDetail} = this.props;
    const {info} = this.state;
    console.log("volunteer detail Step 1"+JSON.stringify(volunteerDetail))
    if(!_.isEmpty(volunteerDetail, true)){
      const newState = {info: {...info, ...volunteerDetail} }
      this.setState(newState);
      console.log("Found in Store")
    }else{
      if (user) {
        const newState = {info: {...info, ...user} }
        newState.info.existingUser =  true;
        this.setState(newState);
      }
    }
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const { info } = this.state;
    const newState = { info:{...info,[event.target.name]: event.target.value }}
    this.setState(newState);
    dispatch(volunteerActions.addVolunteer(newState));
  }

  render() {
    const { classes } = this.props;
    const {info: user} = this.state;
    
    return (
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
                <FormControl  disabled={user.existingUser} margin="normal" required fullWidth>
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
                    name="date"
                    value={user.date}
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { authentication, volunteer } = state;
  const { user } = authentication;
  const { info : volunteerDetail } = volunteer;
  return {
    user,
    volunteerDetail
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(Step1);
