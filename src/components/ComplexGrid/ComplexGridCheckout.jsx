import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { types } from "../../_helpers/const";
const { RENT, CATERING } = types;

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
    width: 100,
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
  button: {
    margin: "10px"
  }
});

class ComplexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spin: false
    };
  }

  getCartDetailInfo(config, type) {
    if (type === RENT && config) {
      return `You are renting it for ${config.days} ${
        config.days === 1 ? "day" : "days"
      }`;
    } else if (type === CATERING && config) {
      return `You are ordering it for ${config.people} ${
        config.people === 1 ? "person" : "people"
      }`;
    }
  }

  render() {
    const { classes, options, alert, handleRemove } = this.props;
    const type = options.type;
    const { spin } = this.state;
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
                      <Typography gutterBottom variant="h6">
                        {options.header}
                      </Typography>
                      <Typography gutterBottom variant="subheading">{options.subHeader}</Typography>
                      <Typography gutterBottom color="textSecondary" noWrap>
                        {this.getCartDetailInfo(options.config, type)}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid item>
                        <Button
                          mini
                          size="small"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={() => {
                            this.setState({ spin: true });
                            setTimeout(
                              function() {
                                if (options) {
                                  handleRemove(options.id, options.type);
                                }
                                this.setState({ spin: false });
                              }.bind(this),
                              700
                            );
                          }}
                        >
                          Remove
                        </Button>
                        {spin && (
                          <img
                            alt="loading"
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                          />
                        )}
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
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users: allUser, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users: allUser.items
  };
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ComplexGrid);
