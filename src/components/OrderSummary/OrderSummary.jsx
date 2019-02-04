import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";


const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class OrderSummary extends React.Component {

  render() {
    const { classes, summary } = this.props;
    const {itemNum, itemTotal, tax, total} = summary;
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Typography variant="h6" component="h6" color="textSecondary">
                Item ({itemNum}):
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="h6" color="textSecondary">
                ${itemTotal}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="h6" color="textSecondary">
                Tax:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="h6" color="textSecondary">
                ${tax}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h6" component="h6">
                Total:
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" component="h6">
                ${total}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(OrderSummary);

export default SimpleModalWrapped;
