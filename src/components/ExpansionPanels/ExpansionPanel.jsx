import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
const moment = require("moment");
const styles = theme => ({
  allCenter: {
    textAlign: "center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "60%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    width: "auto"
  },
  image: {
    width: "70px",
    height: "70px",
    marginLeft: "40px"
  },
  img: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  }
});

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
}))(MuiExpansionPanelDetails);

class CustomizedExpansionPanel extends React.Component {
  state = {
    expanded: "panel1"
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    const { details, classes } = this.props;
    return (
      <div>
        {details &&
          details.length > 0 &&
          details.map((checkout, index) => (
            <ExpansionPanel
              key={index}
              square
              expanded={expanded === index}
              onChange={this.handleChange(index)}
            >
              <ExpansionPanelSummary>
                <Typography className={classes.heading}>
                  Order Number: {checkout.orderId}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Total: ${checkout.summary.total} &nbsp; &nbsp;{" "}
                  {moment(checkout.date).format("MMM D, YYYY h:mm a")}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container key={index} justify="center" spacing={16}>
                  {checkout.items.map((item, index) => (
                    <Grid container key={index} justify="center" spacing={16}>
                      <Grid item xs={4}>
                        <ButtonBase className={classes.image}>
                          <img
                            alt="complex"
                            src={item.imgSrc}
                            className={classes.img}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          {item.header}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item.subHeader}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          Rate: {item.priceText}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(CustomizedExpansionPanel);
