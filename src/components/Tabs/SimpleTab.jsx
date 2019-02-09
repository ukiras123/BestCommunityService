import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "2px",
    paddingRight: "2px",
    marginLeft: "2px",
    marginRight: "2px"
  },
  appBar: {
    backgroundColor: "#b2d7f4"
  }
});

class SimpleTab extends React.Component {
  state = {
    value: 0,
    show: false
  };

  handleChange = (event, value) => {
    this.setState({ value, show: true });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, option } = this.props;
    const { show } = this.state;
    console.log("Show" + show);
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {option.map((option, index) => (
                <Tab key={index} label={option.title} />
              ))}
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={12} align="stretch">
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            {option.map((option, index) => (
              <TabContainer key={index} dir={theme.direction}>
                {option.isComponent === true ? (
                  <option.component />
                ) : (
                  option.component
                )}
              </TabContainer>
            ))}
          </SwipeableViews>
        </Grid>
      </div>
    );
  }
}

SimpleTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SimpleTab);
