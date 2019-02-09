export default theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    position: "relative",
    backgroundColor: "#CAE6F8"
  },
  logo: {
    width: "70px",
    height: "70px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  features: {},
  toolbarTitle: {
    flex: 1
  },
  action: {
    marginTop: "20px",
    marginBottom: "60px",
    textAlign: "center"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: "50px"
  },
  autoMargin: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  heroContent: {
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: "theme.palette.grey[200]"
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});
