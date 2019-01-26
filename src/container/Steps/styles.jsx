export default theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "50px"
    },
    marginTop: "50px"
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: "#F5F5F5"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3,
    alignItems: "center",
    textAlign: "center"
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  register: {
    marginTop: theme.spacing.unit * 3,
    textAlign: "center"
  },
  root: {
    textAlign: "center",
    alignItems: "center",
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3
  },
  slider: {
    padding: "22px 0px"
  }
});
