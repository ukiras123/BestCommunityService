import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grow from "@material-ui/core/Grow";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
});

const tileData = [
  {
    img:
      "https://lonelyplanetwpnews.imgix.net/2018/03/shutterstockRF_618156158-Edited.jpg",
    title: "Mount Everest",
    author: "author",
    featured: true
  },
  {
    img:
      "http://www.careerbreak.com/wp-content/uploads/2017/03/us-grand-canyon-blog-01.jpg",
    title: "Career Break",
    author: "author",
    featured: false
  },
  {
    img:
      "https://abanasafaris.com/wp-content/uploads/2015/11/golden-bridge.jpg",
    title: "Golden Gate Bridge",
    author: "author",
    featured: false
  },
  {
    img: "https://i.ytimg.com/vi/UTGvUjhCcro/maxresdefault.jpg",
    title: "Pyramid of Giza",
    author: "author",
    featured: true
  },
  {
    img: "http://www.cuded.com/wp-content/uploads/2014/04/Taj_Mahal.jpg",
    title: "Taj Mahal",
    author: "author",
    featured: false
  }
];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ImageCollection(props) {
  const { classes, show } = props;
  shuffle(tileData);
  return (
    <div className={classes.root}>
      <GridList cellHeight={300} spacing={1} className={classes.gridList}>
        <GridListTile cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Travel Places</ListSubheader>
        </GridListTile>
        {tileData.map((tile, index) => (
          <Grow
            in={show}
            style={{ transformOrigin: "0 0 0" }}
            {...{ timeout: 1000 * (index + 3) }}
          >
            <GridListTile key={index}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  tile.featured && (
                    <IconButton className={classes.icon}>
                      <StarBorderIcon />
                    </IconButton>
                  )
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          </Grow>
        ))}
      </GridList>
    </div>
  );
}

ImageCollection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageCollection);
