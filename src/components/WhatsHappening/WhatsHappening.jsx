import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { compose } from "redux";
import { newsActions } from "../../redux/actions/news.action";
import { Link, Slide } from "@material-ui/core";

const styles = theme => ({
  card: {},
  media: {}
});

class WhatsHappening extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(newsActions.getNews());
  }

  render() {
    const { classes, news } = this.props;

    return (
      <Grid spacing={24} container justify="center">
        {news.map((news, index) => (
          <Grid key={index} item xs={12} sm={12} lg={4} md={4}>
            <Slide in={true} direction={["down", "left","right","up"][Math.floor(Math.random() * 4)]} {...{ timeout: 700 * (index +8 ) }}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={news.title}
                    className={classes.media}
                    image={news.urlToImage}
                    title={news.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {news.title}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2">
                      {news.description}
                    </Typography>
                    <br />
                    <Typography component="p">{news.content}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={news.url} target="_blank">
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { news } = state;
  return {
    news: news.allNews
  };
}
WhatsHappening.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(WhatsHappening);
