import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { MediaCard } from "../MediaCard";

import {
  catering,
  classes,
  equipments,
  hall,
  homecare,
  shuttle
} from "../../assets/images/services";
import { Link } from "react-router-dom";

const tiers = [
  {
    title: "Rent Equipments",
    subheader: "All equipments for a function",
    description: ["Music System", "Projector", "Lights"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    img: equipments
  },
  {
    title: "Catering Service",
    subheader: "Variety of Cousines",
    description: ["Chinese Cuisine", "Japenese Cuisine", "American Cuisine"],
    img: catering
  },
  {
    title: "Reserve Hall",
    subheader: "Accomodate upto 300 people",
    description: [
      "Reserve for a day",
      "Reserve for 3 hours",
      "Reserce for a night"
    ],
    img: hall
  },

  {
    title: "Home Care",
    subheader: "Our care at your home",
    description: ["For Elderly", "For Handicapped", "For Children"],
    img: homecare
  },
  {
    title: "Free Classes",
    subheader: "Classes provied by volunteers",
    description: ["Spanish Classes", "Arts and Crafts", "Painting Classes"],
    img: classes
  },
  {
    title: "Shuttle Services",
    subheader: "Fits up to 50 people",
    description: ["Within LA", "Within San Diego", "Within Venice"],
    img: shuttle
  }
];

function LandingBody(props) {
  const { classes } = props;

  return (
    <main className={classes.layout}>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Typography
          className={classes.thisFont}
          component="h3"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          For the Community
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          We are here to serve the community. We are here to help you for your
          social events like wedding, meeting or funerals. We also provide
          rental services and other in-house services provided by volunteers.
          <br />
          To help our community thrive, please support us.
        </Typography>
      </div>
      <div className={classes.action}>
        <Link to="/donate" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            className={classes.autoMargin}
            color="secondary"
            variant="outlined"
          >
            Donate Now
          </Button>
        </Link>
        <Link to="/volunteer" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            className={classes.autoMargin}
            color="secondary"
            variant="outlined"
          >
            Volunteer
          </Button>
        </Link>
      </div>
      {/* End hero unit */}
      <div className={classes.features}>
        <Grid container spacing={40} justify="center">
          {tiers.map((tier, index) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={12}
              lg={4}
              md={4}
            >
                <MediaCard
                  number={index + 1}
                  subheader={tier.subheader}
                  image={tier.img}
                  title={tier.title}
                  description={tier.description.map((line, index) => (
                    <Typography align="center" key={index}>
                      {line}
                    </Typography>
                  ))}
                />
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}

LandingBody.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingBody);
