import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexCard } from "../../components/Card";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Grid from "@material-ui/core/Grid";
import { types } from "../../_helpers/const";
import Slide from "@material-ui/core/Slide";
import { hallActions } from "../../redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";

const { HALL } = types;

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
    id: 301,
    type: HALL,
    title: "Opera Hall",
    header: "Opera Hall",
    subHeader: "Good for Wedding",
    imgSrc:
      "http://img.everafterguide.net/s/upload/images/2016/02/c7334d44ef99eb05e8b41ed80ed2fd3d.jpg",
    description: `Opera Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "Arnold Suesecv"],
    priceText: "$400 / day",
    price: 400
  },
  {
    id: 302,
    type: HALL,
    title: "Stretch Hall",
    header: "Stretch Hall",
    subHeader: "Good for Bachelors Party",
    imgSrc:
      "http://usa-stretch-ceilings.com/wp-content/gallery/banquet-halls/banquet-hall-installed-stretch-ceiling.jpg",
    description: `Stretch Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "God's Olan"],
    priceText: "$500 / day",
    price: 500
  },
  {
    id: 303,
    type: HALL,
    title: "MoonShine Hall",
    header: "MoonShine Hall",
    subHeader: "Good for Funeral",
    imgSrc:
      "http://dun6irwnoloqf.cloudfront.net/images/venues/3061/The-Camelot-Banquet-Hall-in-Warrendale-Wedding-PA-17.1429557085.jpg",
    description: `MoonShine Hall brings the height of elegance to your guests from the moment they lay eyes on its red carpet-adorned entryway. 
    Bright and breathtaking, this hall offers the ideal venue for a wedding reception, quinceañera, bar or bat mitzvah, anniversary party, corporate event, shower - frankly, 
    for any celebration you can imagine.`,
    actionName: "Reserve Now",
    moreDetails: ["Designer:", "God of Death"],
    priceText: "$600 / day",
    price: 600
  }
];

class ReserveHallPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  handleAdd = detail => {
    const { dispatch } = this.props;
    if (detail) {
      dispatch(hallActions.addAHall(detail));
    }
  };

  drawerHandle() {
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          handleDrawerOpen={this.drawerHandle}
          loggedInButtons="true"
        />
        <ClippedDrawer toSelect="Reserve Hall" show={this.state.open} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CustomAppBar title="Choose From Variety of Hall" />
          <Grid container spacing={8}>
            {options.map((option, index) => (
              <Slide
                key={index}
                mountOnEnter
                unmountOnExit
                direction="down"
                in={true}
                {...{ timeout: 700 * (index + 1) }}
              >
                <Grid
                  justify="center"
                  container
                  key={index}
                  item
                  xs={12}
                  sm={12}
                  lg={4}
                  md={4}
                >
                  <ComplexCard option={option} handleAdd={this.handleAdd} />
                </Grid>
              </Slide>
            ))}
          </Grid>
        </main>
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

ReserveHallPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ReserveHallPage);
