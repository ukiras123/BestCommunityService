import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    width: "auto"
  },
  image: {
    width: 200,
    height: 200
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function ComplexGrid(props) {
  const { classes, options } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={options.imgSrc}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="headline">
                {options.header}
                </Typography>
                <Typography gutterBottom>{options.subHeader}</Typography>
                <Typography color="textSecondary">
                {options.description}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                {options.actionName}
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">{options.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComplexGrid);
