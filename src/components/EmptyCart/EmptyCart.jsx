import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Quiz from "react-quiz-component";
import { connect } from "react-redux";
import { compose } from "redux";
import { getRandomCategory } from "../../_helpers/util";
import { quizActions } from "../../redux/actions";

const styles = theme => ({
  game: {
    marginTop: "20px"
  },
  center: {
    alignText: "center",
    alignItems: "center"
  }
});

class EmptyCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      luckRequest: false,
      showGame: false
    };
    this.handleLuckRequest = this.handleLuckRequest.bind(this);
  }

  handleLuckRequest() {
    const { dispatch } = this.props;
    dispatch(quizActions.getQuizQuestions(getRandomCategory(), 5));
    this.setState({
      luckRequest: true,
      showGame: false
    });
    setTimeout(
      function() {
        this.setState({
          luckRequest: false,
          showGame: true
        });
      }.bind(this),
      1500
    );
  }

  render() {
    const { classes, quiz } = this.props;
    const { questions } = quiz;
    const { luckRequest, showGame } = this.state;
    return (
      <div>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={8}
        >
          <Grid item xs={12} md={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Your Cart is Empty Right now.
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              className={classes.autoMargin}
              variant="contained"
              color="secondary"
              onClick={this.handleLuckRequest}
            >
             Why not Learn Something!
            </Button>
          </Grid>
          {luckRequest && (
            <Grid item xs={12} md={12}>
              <img
                className={classes.smallImage}
                alt="complex"
                src="https://cdn-images-1.medium.com/max/1600/0*mv8MNRLDNNnt5f72.gif"
              />
            </Grid>
          )}
          {showGame && questions && (
            <div className={classes.game}>
              <Divider />
              <Grid item xs={12} md={12}>
                <div className={classes.game}>
                  <Quiz quiz={questions} shuffle={true} />
                </div>
              </Grid>
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

EmptyCart.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { quiz } = state;

  return {
    quiz
  };
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(EmptyCart);
