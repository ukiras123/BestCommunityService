import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './redux/actions';
import { PrivateRoute, PublicRoute } from './container';
import { HomePage } from './container/HomePage';
import { LoginPage } from './container/LoginPage';
import { RegisterPage } from './container/RegisterPage';
import { ErrorPage } from './container/ErrorPage';
import { LandingPage } from './components/LandingPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    requireAuth(nextState, replace, next){
        console.log(`I m ${localStorage.getItem('user')}`)
        if (!localStorage.getItem('user')) {
            replace({
              pathname: "/main",
              state: {nextPathname: nextState.location.pathname}
            });
          }
          next();
    }
    render() {
        return (
                        <Router history={history}>
                            <Switch>
                                <PublicRoute path="/main" component={LandingPage} />
                                <PrivateRoute path="/home" component={HomePage} />
                                <PublicRoute path="/login" component={LoginPage}/>
                                <PublicRoute path="/register" component={RegisterPage} />
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <Route path="*" component={ErrorPage} />
                                </Switch>
                        </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 