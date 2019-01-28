import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { connect } from "react-redux";
import { compose } from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { volunteerActions } from "../../redux/actions/volunteer.action";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";
const _ = require('lodash');

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: {
        value: 80,
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { volunteerDetail} = this.props;
    const {survey} = this.state;
    if(!_.isEmpty(volunteerDetail, true)){
      const newState = {survey: {...survey, ...volunteerDetail} }
      this.setState(newState);
    }
  }

  handleChange(event) {
    const { dispatch } = this.props;
    const { interest } = this.state;
    const newState = { interest:{...interest,[event.target.name]: event.target.value }}
    this.setState(newState);
    dispatch(volunteerActions.addVolunteer(newState));
  }


  handleChange = (event, value) => {
    const { dispatch } = this.props;
    const { survey } = this.state;
    const newState = { survey: {...survey,value: value }}
    this.setState(newState);
    dispatch(volunteerActions.addVolunteer(newState));
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state.survey;

    return (
      <div>
        <div className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
                <div className={classes.root}>
                  <Typography variant="headline" id="label" >How do you like it so far?</Typography>
                  <Slider
                    min={0}
                    max={100}
                    classes={{ container: classes.slider }}
                    value={value}
                    onChange={this.handleChange}
                  />
                </div>
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
  const { authentication, volunteer } = state;
  const { user } = authentication;
  const { survey: volunteerDetail } = volunteer;
  return {
    user,
    volunteerDetail
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(Step3);
