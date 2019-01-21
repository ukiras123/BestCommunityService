import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './redux/actions';
import { PrivateRoute } from './container';
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

    render() {
        const { alert } = this.props;
        return (
                <div className="container">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/main" component={LandingPage} />
                                <Route path="/home" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="*" component={ErrorPage} />
                                </Switch>
                        </Router>
                </div>
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