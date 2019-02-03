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
    width: theme.spacing.unit * 60,
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
        days: 1
      },
      spin: false,
      added: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("I am handing", JSON.stringify(this.state));
    const { name, value } = event.target;
    const { prodConfig } = this.state;
    console.log(JSON.stringify(prodConfig));
    console.log(name, value);
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

  render() {
    const { classes, options, alert, handleAdd, handleRemove } = this.props;
    console.log(JSON.stringify(alert));
    const { prodConfig, spin, added } = this.state;
    return (
      <div>
        <div>
          <div className={classes.root}>
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
                        <Button
                          variant="contained"
                          disabled={added ? true : false}
                          color="primary"
                          className={classes.button}
                          onClick={() =>{
                            if(options){
                              handleRemove(options.id);
                            }
                          }}
                        >
                          Delete It
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
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper2}>
                <Typography variant="h6" id="modal-title">
                  Please confim
                </Typography>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">Rental Days</InputLabel>
                  <Input
                    id="days"
                    name="days"
                    value={prodConfig.days}
                    autoFocus
                    type="number"
                    onChange={this.handleChange}
                  />
                </FormControl>

                <Button
                  className={classes.buttonI}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ spin: true });
                    setTimeout(
                      function() {
                        const finalProd = {
                          ...options,
                          config: { ...prodConfig }
                        };
                        console.log("Adding ", finalProd);
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
