import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { compose } from "redux";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";
import { types } from "../../_helpers/const";
const { HALL } = types;

const styles = theme => ({
  card: {
    width: 300,
    minHeight: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: orange[500]
  },
  buttonI: {
    margin: "10px"
  },
  button: {
    margin: "10px"
  },
  paper2: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
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
class ComplexCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isNotClicked: true,
      open: false,
      prodConfig: {
        days: 1,
        people: 1,
        hallDays: 1
      },
      spin: false,
      added: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.hallQuestion = this.hallQuestion.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  getQuestion(options) {
    if (options.type === HALL) {
      return this.hallQuestion();
    }
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

  hallQuestion() {
    const { prodConfig } = this.state;

    return (
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="firstName">Reserve Days</InputLabel>
        <Input
          id="hallDays"
          name="hallDays"
          value={prodConfig.hallDays}
          autoFocus
          min="1"
          type="number"
          onChange={this.handleChange}
        />
      </FormControl>
    );
  }

  render() {
    const { classes, option, alert,handleAdd } = this.props;
    const { prodConfig, spin, added } = this.state;
    const { days, people, hallDays } = prodConfig;
    const Question = this.getQuestion(option);
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {option.title.charAt(0)}
              </Avatar>
            }
            title={option.title}
            subheader={option.subHeader}
            action={option.priceText}
          />
          <CardMedia
            className={classes.media}
            image={option.imgSrc}
            title={option.title}
          />
          <CardContent>
            <Typography component="p">{option.description}</Typography>
          </CardContent>
          {alert && alert.message && alert.id === option.id && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              variant="contained"
              color="secondary"
              disabled={added ? true : false}
              className={classes.button}
              onClick={this.handleOpen}
            >
              {option.actionName}
 
            </Button>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {option.moreDetails.map((detail, index) => (
                <Typography key={index} paragraph>
                  {detail}
                </Typography>
              ))}
            </CardContent>
          </Collapse>
        </Card>
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
              disabled={
                !(days === "") && !(people === "") && !(hallDays === "")
                  ? false
                  : true
              }
              color="primary"
              onClick={() => {
                this.setState({ spin: true });
                setTimeout(
                  function() {
                    const finalProd = {
                      ...option,
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

ComplexCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ComplexCard);
