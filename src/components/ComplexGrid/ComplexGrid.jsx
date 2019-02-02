import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
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
    width: 300,
    height: "auto"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class ComplexGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isNotClicked: true
    };
  }

  render() {

    const { classes, options, handleRemove, handleAdd } = this.props;
    const { isNotClicked } = this.state;


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
                  {options.description.map((des, index) => (
                    <Typography color="textSecondary" key={index}>
                      {des}
                    </Typography>
                  ))}
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={isNotClicked ? "secondary" : "primary"}
                    className={classes.button}
                    onClick={() => {
                      if (isNotClicked) {
                        handleAdd(options);

                        this.setState({ isNotClicked: false });
                      } else {
                        this.setState({ isNotClicked: true });
                        handleRemove(options.id);
                      }
                    }}
                  >
                    {isNotClicked ? options.actionName : "Cancel"}
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
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(ComplexGrid);
