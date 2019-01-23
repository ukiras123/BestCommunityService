import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CateringIcon from '@material-ui/icons/Fastfood';
import ClassesIcon from '@material-ui/icons/LibraryBooks';
import HomeCareIcon from '@material-ui/icons/People';
import ShuttleIcon from '@material-ui/icons/AirportShuttle';
import HallIcon from '@material-ui/icons/Domain';
import HomeIcon from '@material-ui/icons/Home';
import EquipmentIcon from '@material-ui/icons/Gavel';
import { Link } from 'react-router-dom';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const leftOptions = [
  {
  "name": "Home",
  "icon": <HomeIcon />,
  "link": "/home"
  },
  {
    
"name": "Rent Equipments",
"icon": <EquipmentIcon />,
"link": "/rent"
  },
  {
"name": "Catering Service",
"icon": <CateringIcon />,
"link": "/catering"
  },
  {
"name": "Reserve Hall",
"icon": <HallIcon />,
"link": "/hall"
  },
  {
"name": "Home care",
"icon": <HomeCareIcon />,
"link": "/homecare"
  },
  {
"name": "Free Classes",
"icon": <ClassesIcon />,
"link": "/freeclasses"
  },
  {
"name": "Shuttle Service",
"icon": <ShuttleIcon /> ,
"link": "/shuttle"
  },
]

const extraOptions = [
  "Download Payment History",
  "Help Center",
  "Contact Support",
  "Terms of Use",
  "Security & Privacy"
]

function ClippedDrawer(props) {
  const { classes, toSelect } = props;

  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {leftOptions.map((option, index) => (
          <Link style={{ textDecoration: 'none' }} to={option.link}  key={option.name}>
            <ListItem selected={toSelect === option.name ? true : false} button key={option.name}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItem>
            </Link>
          ))}
        </List>
          <Divider />
          <List>
          {extraOptions.map((text, index) => (
            <ListItem  key={text}>
              <ListItemText secondary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);