import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us"]
  },
  {
    title: "Features",
    description: ["Cool stuff", "Team feature", "Developer stuff"]
  },
  {
    title: "Resources",
    description: ["Resource", "Resource name", "Another resource"]
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"]
  }
];

function Footer(props) {
  const { classes } = props;

  return (
    <div>
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography
                  key={item}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
      {/* End footer */}
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
