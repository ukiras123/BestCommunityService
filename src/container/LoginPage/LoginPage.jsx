import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import { compose } from 'redux';
import NavBar from '../../components/NavBar'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("i am here")
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }


  render() {
    const { classes, alert } = this.props;
    return (
      <div>
      <NavBar />

      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {alert && alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}  
            >
              Sign in
            </Button>
            <div className={classes.register}>
            <Typography gutterBottom color="textSecondary" component="h6" variant="h6">
              Don't have an account?
              <br></br><Link to="/register" className="btn btn-link">Sign Up</Link>
            </Typography>
            
            </div>
          </form>
        
        </Paper>
      </div>
      </div>

    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;

    return {
        loggingIn,
        alert
    };

}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
      mapStateToProps,
    )
  )(LoginPage);