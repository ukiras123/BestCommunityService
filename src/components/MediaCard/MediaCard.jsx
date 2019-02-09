import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Grow from '@material-ui/core/Grow';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  cardHeader: {
    backgroundColor: "#cbe2f4"
  }
};

function MediaCard(props) {
  const { classes, number } = props;
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }}
    {...{ timeout: 700 * number }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            className={classes.cardHeader}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{ align: "center" }}
            title={props.title}
            subheader={props.subheader}
          />
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.title}
          />
          <CardContent>{props.description}</CardContent>
        </CardActionArea>
        <CardActions>
          <Button fullWidth size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
