import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexCard } from "../../components/Card";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

const options = [
  {
    title: "Opera Hall",
    subtitle: "Good for Wedding",
    imageSrc:
      "http://img.everafterguide.net/s/upload/images/2016/02/c7334d44ef99eb05e8b41ed80ed2fd3d.jpg",
    description: `Opera Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "Arnold Suesecv"]
  },
  {
    title: "Stretch Hall",
    subtitle: "Good for Bachelors Party",
    imageSrc:
      "http://usa-stretch-ceilings.com/wp-content/gallery/banquet-halls/banquet-hall-installed-stretch-ceiling.jpg",
    description: `Stretch Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "God's Olan"]
  },
  {
    title: "MoonShine Hall",
    subtitle: "Good for Funeral",
    imageSrc:
      "http://dun6irwnoloqf.cloudfront.net/images/venues/3061/The-Camelot-Banquet-Hall-in-Warrendale-Wedding-PA-17.1429557085.jpg",
    description: `MoonShine Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "God of Death"]
  }
];

function ReserveHallPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar isFixed="true" loggedInButtons="true" />
      <ClippedDrawer toSelect="Reserve Hall" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CustomAppBar title="Choose From Variety of Hall" />
        <Grid container spacing={8}>
          {options.map((option, index) => (
            <Grid continer key={index} item xs={4}>
              <ComplexCard option={option} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}

ReserveHallPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReserveHallPage);
