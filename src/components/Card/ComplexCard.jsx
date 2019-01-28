import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";

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
  button: {
    marginLeft: "15px"
  }
});

class ComplexCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, option } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {option.title.charAt(0)}
            </Avatar>
          }
          title={option.title}
          subheader={option.subtitle}
        />
        <CardMedia
          className={classes.media}
          image={option.imageSrc}
          title={option.title}
        />
        <CardContent>
          <Typography component="p">{option.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
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
    );
  }
}

ComplexCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComplexCard);
