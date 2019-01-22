import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {MediaCard} from '../MediaCard';
import {catering,classes,equipments,hall,homecare,shuttle} from '../../assets/images/services'
import NavBar from '../NavBar'

const tiers = [
  {
    title: 'Rent Equipments',
    subheader: 'All equipments for a function',
    description: ['Music System', 'Projector', 'Lights'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
    img: equipments
  },
  {
    title: 'Catering Service',
    subheader: 'Variety of Cousines',
    description: [
      'Chinese Cuisine',
      'Japenese Cuisine',
      'American Cuisine',
    ],
    img: catering
  },
  {
    title: 'Reserve Hall',
    subheader: 'Accomodate upto 300 people',
    description: [
      'Reserve for a day',
      'Reserve for 3 hours',
      'Reserce for a night',
    ],
    img: hall
  },

  {
    title: 'Home Care',
    subheader: 'Our care at your home',
    description: [
      'For Elderly',
      'For Handicapped',
      'For Children'
    ],
    img: homecare
  },
  {
    title: 'Free Classes',
    subheader: 'Classes provied by volunteers',
    description: [
      'Spanish Classes',
      'Arts and Crafts',
      'Painting Classes',
    ],
    img: classes
  },
  {
    title: 'Shuttle Services',
    subheader: 'Fits up to 50 people',
    description: [
      'Within LA',
      'Within San Diego',
      'Within Venice',
    ],
    img: shuttle
  }
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us'],
  },
  {
    title: 'Features',
    description: ['Cool stuff',  'Team feature', 'Developer stuff'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function LandingPage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar showLinks='true' />
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography className={classes.thisFont} component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            For the Community
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            We are here to serve the community. We are here to help you for your social events like wedding, meeting or funerals.
            We also provide rental services and other in-house services provided by volunteers.
            <br></br>To help our community thrive, please support us.
          </Typography>
        </div>
        <div className={classes.action}>
         <Button size="large" className={classes.autoMargin} color="secondary" variant="outlined">
            Donate Now
          </Button>
          <Button size="large"  className={classes.autoMargin} color="secondary" variant="outlined">
            Volunteer
          </Button>
        </div>
        {/* End hero unit */}
        <div className={classes.features}>
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={4}>
              <MediaCard subheader={tier.subheader} image={tier.img} title={tier.title} description={tier.description.map((line, index) => (
                    <Typography align="center" key={index}>
                      {line}
                    </Typography>
                  ))} />
            </Grid>
          ))}
        </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subtitle1" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);