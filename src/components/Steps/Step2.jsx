import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const _ = require("lodash");

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: {
        interest: "",
        yourself: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { volunteerDetail } = this.props;
    const { interest } = this.state;
    if (!_.isEmpty(volunteerDetail, true)) {
      const newState = { interest: { ...interest, ...volunteerDetail } };
      this.setState(newState);
    }
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const { interest } = this.state;
    const newState = {
      interest: { ...interest, [event.target.name]: event.target.value }
    };
    this.setState(newState);
    dispatch(volunteerActions.addVolunteer(newState));
  }

  render() {
    const { classes } = this.props;
    const { interest } = this.state;
    return (
      <div>
        <div className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="interest">Interest</InputLabel>
                    <Select
                      value={interest.interest}
                      onChange={this.handleChange}
                      name="interest"
                      id="interest"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Kids">Kids</MenuItem>
                      <MenuItem value="Veterans">Veterans</MenuItem>
                      <MenuItem value="Hunger">Hunger</MenuItem>
                      <MenuItem value="Poverty">Poverty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl required fullWidth>
                    <TextField
                      id="yourself"
                      label="Talk about yourself"
                      name="yourself"
                      multiline
                      rowsMax="4"
                      value={interest.yourself}
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
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

Step2.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { authentication, volunteer } = state;
  const { user } = authentication;
  const { interest: volunteerDetail } = volunteer;
  return {
    user,
    volunteerDetail
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(Step2);
