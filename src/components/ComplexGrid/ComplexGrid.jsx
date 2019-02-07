import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { types } from "../../_helpers/const";
import Fade from '@material-ui/core/Fade';

const { CATERING, RENT } = types;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    width: "auto"
  },
  image: {
    width: 200,
    height: "auto"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  paper2: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  buttonI: {
    margin: "10px"
  },
  button: {
    margin: "10px"
  },
  small: {
    width: "50%"
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class ComplexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotClicked: true,
      open: false,
      prodConfig: {
        days: 1,
        people: 1
      },
      spin: false,
      added: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.rentalQuestion = this.rentalQuestion.bind(this);
    this.cateringQuestion = this.cateringQuestion.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (value && (value < 1 || value > 1000)) {
      return;
    }
    const { prodConfig } = this.state;
    this.setState({
      prodConfig: {
        ...prodConfig,
        [name]: value
      }
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  rentalQuestion() {
    const { prodConfig } = this.state;

    return (
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="firstName">Rental Days</InputLabel>
        <Input
          id="days"
          name="days"
          value={prodConfig.days}
          autoFocus
          min="1"
          type="number"
          onChange={this.handleChange}
        />
      </FormControl>
    );
  }

  cateringQuestion() {
    const { prodConfig } = this.state;

    return (
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="people">How Many People?</InputLabel>
        <Input
          id="people"
          name="people"
          value={prodConfig.people}
          autoFocus
          min="1"
          max="1000"
          type="number"
          onChange={this.handleChange}
        />
      </FormControl>
    );
  }

  getQuestion(options) {
    if (options.type === RENT) {
      return this.rentalQuestion();
    } else if (options.type === CATERING) {
      return this.cateringQuestion();
    }
  }

  render() {
    const { classes, options, alert, handleAdd } = this.props;
    const { prodConfig, spin, added } = this.state;
    const { days, people } = prodConfig;
    const Question = this.getQuestion(options);
    return (
      <div>
        <div>
          <div className={classes.root}>
          <Fade in={true} {...{ timeout: 700 * this.props.number  }}>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={options.imgSrc}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={16}>
                    <Grid item xs>
                      <Typography gutterBottom variant="headline">
                        {options.header}
                      </Typography>
                      <Typography gutterBottom>{options.subHeader}</Typography>
                      {options.description.map((des, index) => (
                        <Typography color="textSecondary" key={index}>
                          {des}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs>
                      <Grid item>
                        <Button
                          variant="contained"
                          disabled={added ? true : false}
                          color="secondary"
                          className={classes.button}
                          onClick={this.handleOpen}
                        >
                          {options.actionName}
                        </Button>
                      </Grid>
                      <Grid item>
                        {alert && alert.message && alert.id === options.id && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{options.priceText}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            </Fade>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper2}>
                <Typography variant="h6" id="modal-title">
                  Please confirm
                </Typography>
                {Question}

                <Button
                  className={classes.buttonI}
                  variant="contained"
                  disabled={!(days === "") && !(people === "") ? false : true}
                  color="primary"
                  onClick={() => {
                    this.setState({ spin: true });
                    setTimeout(
                      function() {
                        const finalProd = {
                          ...options,
                          config: { ...prodConfig }
                        };
                        handleAdd(finalProd);
                        this.handleClose();
                        this.setState({ added: true });
                      }.bind(this),
                      700
                    );
                  }}
                >
                  Confirm
                </Button>
                <Button
                  className={classes.buttonI}
                  variant="contained"
                  onClick={this.handleClose}
                >
                  Cancel
                </Button>
                {spin && (
                  <img
                    alt="loading"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                )}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ComplexGrid);
